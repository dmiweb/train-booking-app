import { put, spawn, takeLatest, select, cancelled, call, delay } from "redux-saga/effects";
import { requestSeats, getSeatsFromSuccess, getSeatsToSuccess, getSeatsFailure } from "../slices/seatsSlice";
import { fetchData } from "../api";
import { TTrain, TSeat, RetryRequestConfig } from "../models";

const retryRequestConfig: RetryRequestConfig = {
  initialDelay: 5 * 100,
  maxDelay: 5 * 1000,
  exponent: 2,
};

function* handleGetSeatsSaga(): Generator {
  const selectedTrain: TTrain | null = yield select((state) => state.trains.selectedTrain);

  if (!selectedTrain || !selectedTrain.departure) {
    yield put(getSeatsFailure("Поезд не выбран или данные отсутствуют"));
    return;
  }

  const { departure, arrival } = selectedTrain;

  if (!departure._id) {
    yield put(getSeatsFailure("Неверный ID поезда"));
    return;
  }

  const {
    have_wifi,
    have_air_conditioning
  } = yield select((state) => state.queryParams);

  const filterQueryParams = Object.fromEntries(
    Object.entries({
      have_wifi,
      have_air_conditioning
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => {
        return value !== false && value !== 0 && value !== "" && value != null;
      })
      .map(([key, value]) => [key, String(value)])
  );

  const searchParamsString = Object.keys(filterQueryParams).length > 0
    ? `?${new URLSearchParams(filterQueryParams).toString()}`
    : "";

  const urlFrom = `${import.meta.env.VITE_GET_DATA_URL}/${departure._id}/seats${searchParamsString}`;
  let urlTo = "";

  if (arrival) {
    urlTo = `${import.meta.env.VITE_GET_DATA_URL}/${arrival._id}/seats${searchParamsString}`;
  }

  const abortController: AbortController = new AbortController();
  const signal = abortController.signal;
  let attempt = 0;

  while (true) {
    try {
      attempt++;

      const seatsFrom: TSeat[] = yield call(fetchData, urlFrom, signal);
      yield put(getSeatsFromSuccess(seatsFrom));

      if(urlTo) {
        const seatsTo: TSeat[] = yield call(fetchData, urlTo, signal);
        yield put(getSeatsToSuccess(seatsTo));
      } 

      break;
    } catch (err: unknown) {
      void err;
      yield put(getSeatsFailure("Произошла ошибка!"));
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

        console.log(`Места - попытка ${attempt}: ${delayTime}ms`);
        yield delay(delayTime);
      }
    }
  }
}

function* watchGetSeatsSaga() {
  yield takeLatest(requestSeats.type, handleGetSeatsSaga);
}

export default function* seatsSaga() {
  yield spawn(watchGetSeatsSaga);
}