import { takeLatest, put, call, spawn, delay, select } from 'redux-saga/effects';
// import { PayloadAction } from '@reduxjs/toolkit';
import { submitOrder, getOrderStatus} from '../slices/orderSlice';
import { TOrderCompleted } from '../models';
import { fetchStatusOrder } from "../api";



function* handleSubmitOrderSaga() {
  const url = import.meta.env.VITE_POST_ORDER_URL;
  const {order}: {order: TOrderCompleted}  = yield select((state) => state.order);

  while (true) {
    try {
      const status: boolean = yield call(fetchStatusOrder, url, order);

      yield put(getOrderStatus(status));
      break;
    } catch (err: unknown) {
      void err;
    }
    yield delay(3000);
  }
}

function* watchSubmitOrderSaga() {
  yield takeLatest(submitOrder.type, handleSubmitOrderSaga);
}

export default function* orderSaga() {
  yield spawn(watchSubmitOrderSaga);
}