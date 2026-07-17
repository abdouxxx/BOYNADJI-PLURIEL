import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transport from "./pages/transport";
import Commerce from "./pages/Commerce";
import Categories from "./pages/Categories";
import Panier from "./pages/Panier";
import Facture from "./pages/Facture";
import HistoriqueFactures from "./pages/HistoriqueFactures";
import TableauDeBord from "./pages/TableauDeBord";

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
    <Route path="/panier" element={<Panier />} />
    <Route
    path="/facture"
    element={<Facture />}
/>

<Route
    path="/historique-factures"
    element={<HistoriqueFactures />}
/>

<Route path="/tableau-bord" element={<TableauDeBord />} />

      </Routes>

  

    </BrowserRouter>
  );
}

export default App;