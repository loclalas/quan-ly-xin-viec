import { Landing, Error, Register } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddJob,
  AllJob,
  Profile,
  HomeDashboard,
  SharedLayout,
} from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomeDashboard />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="all-jobs" element={<AllJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
