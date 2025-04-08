import { all, spawn } from 'redux-saga/effects';
import catalogSaga from './catalogSaga';
import citiesSaga from './citiesSaga';
import categoriesSaga from './categoriesSaga';
import productSaga from './productSaga';
import cartSaga from './cartSaga';

export default function* rootSaga() {
  yield all([
    spawn(catalogSaga),
    spawn(citiesSaga),
    spawn(categoriesSaga),
    spawn(productSaga),
    spawn(cartSaga)
  ]);
}