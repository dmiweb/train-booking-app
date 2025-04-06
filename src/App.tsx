import { Routes, Route } from 'react-router-dom';
import { HomePage, TrainSelectPage, SeatsSelectPage, PassengersPage, PaymentPage, ConfirmPage, SuccessOrderPage } from './pages';
import { Layout, OrderLayout } from './components';
import "./assets/css/normalize.css"
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="/trains" element={<TrainSelectionPage />} /> */}
      </Route>

      <Route path="/" element={<OrderLayout />}>
        <Route path="/trains" element={<TrainSelectPage />} />
        <Route path="/seats" element={<SeatsSelectPage />} />
        <Route path="/passengers" element={<PassengersPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/success" element={<SuccessOrderPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  )
}

export default App;
