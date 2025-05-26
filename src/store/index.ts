import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import modalReducer from '../slices/modalSlice';
import subscribeReducer from '../slices/subscribeSlice';
import trainReducer from '../slices/trainSlice';
import queryParamsReducer from '../slices/queryParamsSlice';
import lastTicketsReducer from '../slices/lastTicketsSlice';
import citiesReducer from '../slices/citiesSlice';
import seatsReducer from '../slices/seatsSlice';
import passengersReducer from "../slices/passengersSlice"
import orderReducer from '../slices/orderSlice';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    subscribe: subscribeReducer,
    cities: citiesReducer,
    trains: trainReducer,
    queryParams: queryParamsReducer,
    lastTickets: lastTicketsReducer,
    seats: seatsReducer,
    passengers: passengersReducer,
    order: orderReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;