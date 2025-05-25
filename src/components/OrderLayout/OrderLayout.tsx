import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";

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