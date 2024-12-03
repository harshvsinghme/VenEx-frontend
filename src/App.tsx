import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employees from "./pages/employees";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route
          path="*"
          element={
            <h1 className="text-center mt-[45vh]">Page Not found - 404</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
