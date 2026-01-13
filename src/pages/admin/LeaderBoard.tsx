import { useEffect, useState } from "react";

import {
  getLeaderboardApi,
  type LeaderboardItem,
} from "../../api/admin.api";
import AdminHeader from "../../components/AdminHeader";

const Leaderboard = () => {
  const [data, setData] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState(false);


  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await getLeaderboardApi();
      setData(res.data.data);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6">
      {/* Admin Header */}
       <AdminHeader
        title="Admin Panel"
        subtitle="Leaderboard"
        activeTab="leaderboard"
      />
      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Rank</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Type</th>
              <th className="p-2">Referrals</th>
              <th className="p-2">Earnings</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={row.userId} className="border-t">
                  <td className="p-2 text-center">
                    #{index + 1}
                  </td>
                  <td className="p-2">{row.name}</td>
                  <td className="p-2">{row.email}</td>
                  <td className="p-2 text-center">{row.userType}</td>
                  <td className="p-2 text-center">
                    {row.totalReferrals}
                  </td>
                  <td className="p-2 text-center font-medium">
                    ₹{row.totalEarnings}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
