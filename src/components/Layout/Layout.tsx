import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";

const Layout = () => {
  return (
    <>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;