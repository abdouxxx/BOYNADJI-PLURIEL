import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transport from "./pages/transport";

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



    </Routes>
</BrowserRouter>
  );
}

export default App;