import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";
import "./OrderLayout.css";

const OrderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default OrderLayout;