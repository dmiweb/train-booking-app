import { Routes, Route } from 'react-router-dom';
import { HomePage, TrainSelectionPage } from './pages';
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
        <Route path="/trains" element={<TrainSelectionPage />} />
        {/* <Route path="/catalog/:id" element={<ProductPage />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/contacts" element={<ContactsPage />} /> */}
        {/* <Route path="/cart" element={<CartPage />} /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  )
}

export default App;
