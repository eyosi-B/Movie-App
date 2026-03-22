import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  return (
    <div className="min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
        toastClassName="!rounded-2xl !border !border-white/10 !bg-slate-950/90 !shadow-2xl"
      />
      <Navigation />
      <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
