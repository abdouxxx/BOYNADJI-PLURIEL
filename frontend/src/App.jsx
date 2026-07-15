import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transport from "./pages/transport";
import Commerce from "./pages/Commerce";
import Categories from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/transport"
          element={
            <ProtectedRoute>
              <Transport />
            </ProtectedRoute>
          }
        />


        <Route
          path="/commerce"
          element={
            <ProtectedRoute>
              <Commerce />
            </ProtectedRoute>
          }
        />

        <Route
  path="/categories"
  element={
    <ProtectedRoute>
      <Categories />
    </ProtectedRoute>
  }
/>


      </Routes>

    </BrowserRouter>
  );
}

export default App;