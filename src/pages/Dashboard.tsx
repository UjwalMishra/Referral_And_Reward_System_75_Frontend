import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDashboardApi } from "../api/user.api";
import { logoutApi } from "../api/auth.api";
import { removeAccessToken } from "../utils/token";
import type { UserDashboardData } from "../api/user.api";

const Dashboard = () => {
  const [data, setData] = useState<UserDashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await getUserDashboardApi();
      setData(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
    } finally {
      removeAccessToken();
      navigate("/login");
    }
  };

  const copyReferralCode = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.referralCode);
    alert("Referral code copied!");
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading || !data) {
    return (
      <div className="p-6 text-center text-sm">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">User Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome, {data.name}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <div className="bg-white border rounded p-4">
          <p className="text-sm text-gray-500">User Type</p>
          <p className="text-lg font-medium">{data.userType}</p>
        </div>

        <div className="bg-white border rounded p-4">
          <p className="text-sm text-gray-500">Total Referrals</p>
          <p className="text-lg font-medium">
            {data.totalReferrals}
          </p>
        </div>

        <div className="bg-white border rounded p-4">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="text-lg font-medium">
            ₹{data.totalEarnings}
          </p>
        </div>

        <div className="bg-white border rounded p-4">
          <p className="text-sm text-gray-500">Referral Code</p>
          <div className="flex items-center justify-between mt-1">
            <span className="font-mono text-sm">
              {data.referralCode}
            </span>
            <button
              onClick={copyReferralCode}
              className="text-xs border px-2 py-1 rounded"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
