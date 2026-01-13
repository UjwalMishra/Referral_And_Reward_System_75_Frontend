import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import ReferralReport from "./pages/admin/RefferalReport";
import Payouts from "./pages/admin/Payouts";
import Leaderboard from "./pages/admin/LeaderBoard"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Navigate to="/admin/referral-report" replace />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/referral-report"
          element={
            <AdminRoute>
              <ReferralReport />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/payouts"
          element={
            <AdminRoute>
              <Payouts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/leaderboard"
          element={
            <AdminRoute>
              <Leaderboard />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
