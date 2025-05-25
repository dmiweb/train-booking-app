import { all, spawn } from 'redux-saga/effects';
import trainSaga from './trainSaga';
import citiesSaga from './citiesSaga';
import lastTicketsSaga from './lastTicketsSaga';
import seatsSaga from './seatsSaga';
import orderSaga from './orderSaga';

export default function* rootSaga() {
  yield all([
    spawn(trainSaga),
    spawn(citiesSaga),
    spawn(lastTicketsSaga),
    spawn(seatsSaga),
    spawn(orderSaga)
  ]);
}