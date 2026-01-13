import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/auth.api";
import { removeAccessToken } from "../utils/token";

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  activeTab: "referral" | "payouts" | "leaderboard";
}

const AdminHeader = ({ title, subtitle, activeTab }: AdminHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } finally {
      removeAccessToken();
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/admin/referral-report")}
          className={`border px-3 py-2 rounded text-sm ${
            activeTab === "referral" ? "bg-gray-100" : ""
          }`}
        >
          Referral Report
        </button>

        <button
          onClick={() => navigate("/admin/payouts")}
          className={`border px-3 py-2 rounded text-sm ${
            activeTab === "payouts" ? "bg-gray-100" : ""
          }`}
        >
          Payouts
        </button>

        <button
          onClick={() => navigate("/admin/leaderboard")}
          className={`border px-3 py-2 rounded text-sm ${
            activeTab === "leaderboard" ? "bg-gray-100" : ""
          }`}
        >
          Leaderboard
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
