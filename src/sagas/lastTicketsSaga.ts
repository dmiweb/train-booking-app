import { call, put, spawn, cancelled, delay, take, race } from "redux-saga/effects";
import { requestLastTickets, getLastTicketsSuccess, getLastTicketsFailure, cancelRequestLastTickets } from "../slices/lastTicketsSlice";
import { fetchData } from "../api";
import { TLastTicket, RetryRequestConfig } from "../models";

const retryRequestConfig: RetryRequestConfig = {
  initialDelay: 5 * 100,
  maxDelay: 5 * 1000,
  exponent: 2,
};

function* handleGetLastTicketsSaga(): Generator {
  const url = `${import.meta.env.VITE_GET_DATA_URL}/last`;

  const abortController: AbortController = new AbortController();
  const signal = abortController.signal;
  let attempt = 0;

  while (true) {
    try {
      attempt++;

      const lastTickets: TLastTicket[] = yield call(fetchData, url, signal);
      yield put(getLastTicketsSuccess(lastTickets));
      break;
    } catch (err: unknown) {
      void err;
      yield put(getLastTicketsFailure("Произошла ошибка!"));
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

        console.log(`Категории - попытка ${attempt}: ${delayTime}ms`);
        yield delay(delayTime);
      }
    }
  }
}

function* watchGetLastTicketsSaga(): Generator {
  while (true) {
    yield take(requestLastTickets.type)
    yield race({
      task: call(handleGetLastTicketsSaga),
      cancel: take(cancelRequestLastTickets.type)
    })
  }
}

export default function* categoriesSaga() {
  yield spawn(watchGetLastTicketsSaga);
}