import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// import catalogReducer from '../slices/catalogSlice';
// import categoriesReducer from '../slices/categoriesSlice';
import citiesReducer from '../slices/citiesSlice';
// import productReducer from '../slices/productSlice';
// import cartReducer from '../slices/cartSlice';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    // catalog: catalogReducer,
    // categories: categoriesReducer,
    // product: productReducer,
    // cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;