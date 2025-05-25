import { call, put, spawn, take, race, cancelled, delay } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { requestCities, getCitiesSuccess, getCitiesFailure, cancelRequestCities } from "../slices/citiesSlice";
import { fetchData } from "../api";
import { TCities, RetryRequestConfig } from "../models";

const retryRequestConfig: RetryRequestConfig = {
  initialDelay: 5 * 100,
  maxDelay: 5 * 1000,
  exponent: 2,
};

function* handleGetCitiesSaga(action: PayloadAction<string>): Generator {
  const params = `cities?name=${action.payload}`
  const url =`${import.meta.env.VITE_GET_DATA_URL}/${params}`;

  const abortController: AbortController = new AbortController();
  const signal = abortController.signal;
  let attempt = 0;

  while (true) {
    if(attempt === 2) break;
    try {
      attempt++;

      const cities: TCities[] = yield call(fetchData, url, signal);

      yield put(getCitiesSuccess(cities));
      break;
    } catch (err: unknown) {
      void err;
      yield put(getCitiesFailure("Произошла ошибка!"));
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

        console.log(`Города - попытка ${attempt}: ${delayTime}ms`);
        yield delay(delayTime);
      }
    }
  }
}

function* watchGetCitiesSaga(): Generator {
  while (true) {
    const action: PayloadAction<string> = yield take(requestCities.type);

    yield race({
      task: call(handleGetCitiesSaga, action),
      cancel: take(cancelRequestCities.type)
    })
  }
}

export default function* productsSaga() {
  yield spawn(watchGetCitiesSaga);
}