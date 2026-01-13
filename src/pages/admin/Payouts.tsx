import { useEffect, useState } from "react";
import { processPayoutApi } from "../../api/admin.api";
import api from "../../api/axios";
import AdminHeader from "../../components/AdminHeader";

interface PendingPayout {
  userId: string;
  name: string;
  email: string;
  pendingAmount: number;
}

const Payouts = () => {
  const [data, setData] = useState<PendingPayout[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchPendingPayouts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/payouts/pending");
      setData(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const handlePayout = async (userId: string) => {
    setProcessingId(userId);
    try {
      await processPayoutApi(userId);
      fetchPendingPayouts(); // refresh list
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    fetchPendingPayouts();
  }, []);

  return (
    <div className="p-6">
      <AdminHeader
        title="Admin Panel"
        subtitle="Payout Management"
        activeTab="payouts"
      />

      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Pending Amount</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  No pending payouts 🎉
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.userId} className="border-t">
                  <td className="p-2">{row.name}</td>
                  <td className="p-2">{row.email}</td>
                  <td className="p-2 text-center">₹{row.pendingAmount}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handlePayout(row.userId)}
                      disabled={processingId === row.userId}
                      className="bg-gray-900 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                    >
                      {processingId === row.userId
                        ? "Processing..."
                        : "Process Payout"}
                    </button>
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

export default Payouts;
