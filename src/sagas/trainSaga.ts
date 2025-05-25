import { put, spawn, takeLatest, cancelled, call, delay, select, take, race } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { requestTrains, getTrainsSuccess, getTrainsFailure, cancelRequestTrains } from "../slices/trainSlice";
import { fetchData } from "../api";
import { TTrainsData, TQueryParams, RetryRequestConfig } from "../models";

const retryRequestConfig: RetryRequestConfig = {
  initialDelay: 5 * 100,
  maxDelay: 5 * 1000,
  exponent: 2,
};

function* handleGetTrainsSaga(): Generator {
  let url = import.meta.env.VITE_GET_DATA_URL;

  const abortController: AbortController = new AbortController();
  const signal = abortController.signal;

  const queryParams: TQueryParams = yield select((state) => state.queryParams);

  const filterQueryParams = Object.fromEntries(
    Object.entries(queryParams)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => {
        return value !== false && value !== 0 && value !== "" && value != null;
      })
      .map(([key, value]) => [key, String(value)])
  );

  const searchParams = new URLSearchParams(filterQueryParams);
  const queryString = searchParams.toString();

  url = `${url}${queryString ? `?${queryString}` : ""}`;

  let attempt = 0;

  while (true) {
    if (attempt === 4) break;

    try {
      attempt++;

      const trains: TTrainsData = yield call(fetchData, url, signal);

      yield put(getTrainsSuccess(trains));
      break;
    } catch (error: unknown) {
      void error;
      if (attempt === 4) {
        if (!navigator.onLine) {
          yield put(getTrainsFailure("Нет соединения с интернетом!"));
        } else {
          yield put(getTrainsFailure("Не удалось загрузить список поездов!"));
        }
      }
    }
    finally {
      if (yield cancelled()) {
        abortController.abort();
      }

      if (attempt > 1) {
        let delayTime =
          retryRequestConfig.initialDelay * Math.pow(retryRequestConfig.exponent, attempt - 1);
        delayTime = Math.min(delayTime, retryRequestConfig.maxDelay);
        delayTime += Math.random() * 200;

        console.log(`Список поездов - попытка ${attempt}: ${delayTime}ms`);
        yield delay(delayTime);
      }
    }
  }
}

function* createCancellableWatcher(
  requestAction: string,
  cancelAction: string,
  handleSaga: (action: PayloadAction<void, typeof requestTrains.type>) => Generator
) {
  yield takeLatest(requestAction, function* (action: PayloadAction<void, typeof requestTrains.type>) {
    yield race({
      task: call(handleSaga, action),
      cancel: take(cancelAction),
    });
  });
}

function* watchGetTrainsSaga() {
  yield createCancellableWatcher(
    requestTrains.type,
    cancelRequestTrains.type,
    handleGetTrainsSaga
  );
}

export default function* trainSaga() {
  yield spawn(watchGetTrainsSaga);
}