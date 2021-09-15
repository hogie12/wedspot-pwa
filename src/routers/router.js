import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Routers = () => {
  // const token = localStorage.getItem("token");
  const { isSuccess } = useSelector((state) => state.vendorData);
  console.log(isSuccess);
  return (
    <>
      {isSuccess ? <Sidebar /> : <Home />}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Routers;
