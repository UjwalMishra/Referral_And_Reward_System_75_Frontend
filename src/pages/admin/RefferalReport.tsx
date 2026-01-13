import { useEffect, useState } from "react";
import {
  getReferralReportApi,
  exportReferralCSVApi,
  exportReferralPDFApi,
  type ReferralReportItem,
} from "../../api/admin.api";
import AdminHeader from "../../components/AdminHeader";

const ReferralReport = () => {
  const [data, setData] = useState<ReferralReportItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [userType, setUserType] = useState<"NORMAL" | "OMNI" | "">("");
  const [minEarnings, setMinEarnings] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await getReferralReportApi({
        search: search || undefined,
        userType: userType || undefined,
        minEarnings: minEarnings ? Number(minEarnings) : undefined,
        page,
        limit,
      });

      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [page]);

  const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportCSV = async () => {
    const res = await exportReferralCSVApi();
    downloadFile(res.data, "referral-report.csv");
  };

  const handleExportPDF = async () => {
    const res = await exportReferralPDFApi();
    downloadFile(res.data, "referral-report.pdf");
  };

  return (
    <div className="p-6">
      <AdminHeader
        title="Admin Panel"
        subtitle="Referral & Payout Management"
        activeTab="referral"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          placeholder="Search name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />

        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value as any)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="">All Users</option>
          <option value="NORMAL">Normal</option>
          <option value="OMNI">Omni</option>
        </select>

        <input
          type="number"
          placeholder="Min earnings"
          value={minEarnings}
          onChange={(e) => setMinEarnings(e.target.value)}
          className="border px-3 py-2 rounded text-sm w-32"
        />

        <button
          onClick={() => {
            setPage(1);
            fetchReport();
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded text-sm"
        >
          Apply
        </button>

        <button
          onClick={handleExportCSV}
          className="border px-4 py-2 rounded text-sm"
        >
          Export CSV
        </button>

        <button
          onClick={handleExportPDF}
          className="border px-4 py-2 rounded text-sm"
        >
          Export PDF
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
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
                <td colSpan={5} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No data found
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.userId} className="border-t">
                  <td className="p-2">{row.name}</td>
                  <td className="p-2">{row.email}</td>
                  <td className="p-2 text-center">{row.userType}</td>
                  <td className="p-2 text-center">{row.totalReferrals}</td>
                  <td className="p-2 text-center">₹{row.totalEarnings}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="border px-3 py-1 rounded text-sm disabled:opacity-50"
        >
          Prev
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="border px-3 py-1 rounded text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReferralReport;
