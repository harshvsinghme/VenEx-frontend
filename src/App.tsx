import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employees from "./pages/employees";
import { ToastContainer } from "react-toastify";
import EmployeesPerformance from "./pages/employees-performance";

const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Employees />} />
            <Route
              path="employees-performance"
              element={<EmployeesPerformance />}
            />
          </Route>
          <Route
            path="*"
            element={
              <h1 className="text-center mt-[45vh]">Page Not found - 404</h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
