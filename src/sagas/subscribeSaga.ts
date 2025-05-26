import { put, spawn, takeLatest, cancelled, call, delay, take, race } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import {
  requestSubscribe,
  getSubscribeStatusSuccess,
  getSubscribeStatusFailure,
  cancelRequestSubscribe
} from "../slices/subscribeSlice";
import { fetchStatus } from "../api";
import { RetryRequestConfig } from "../models";

const retryRequestConfig: RetryRequestConfig = {
  initialDelay: 5 * 100,
  maxDelay: 5 * 1000,
  exponent: 2,
};

function* handleSubscribeSaga(action: PayloadAction<string>): Generator {
  const email = `email=${encodeURIComponent(action.payload)}`;
  const url = `${import.meta.env.VITE_GET_SUBSCRIBE_URL}?${email}`;

  const abortController: AbortController = new AbortController();
  const signal = abortController.signal;

  let attempt = 0;

  while (true) {
    if (attempt === 4) break;

    try {
      attempt++;

      const status = yield call(fetchStatus, url, signal);

      yield put(getSubscribeStatusSuccess(status));
      break;
    } catch (error: unknown) {
      void error;
      if (attempt === 4) {
        if (!navigator.onLine) {
          yield put(getSubscribeStatusFailure("Нет соединения с интернетом!"));
        } else {
          yield put(getSubscribeStatusFailure("Не удалось подписаться!"));
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

        console.log(`Подписка - попытка ${attempt}: ${delayTime}ms`);
        yield delay(delayTime);
      }
    }
  }
}

function* createCancellableWatcher(
  requestAction: string,
  cancelAction: string,
  handleSaga: (action: PayloadAction<string, typeof requestSubscribe.type>) => Generator
) {
  yield takeLatest(requestAction, function* (action: PayloadAction<string, typeof requestSubscribe.type>) {
    yield race({
      task: call(handleSaga, action),
      cancel: take(cancelAction),
    });
  });
}

function* watchSubscribeSaga() {
  yield createCancellableWatcher(
    requestSubscribe.type,
    cancelRequestSubscribe.type,
    handleSubscribeSaga
  );
}

export default function* subscribeSaga() {
  yield spawn(watchSubscribeSaga);
}