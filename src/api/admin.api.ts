import api from "./axios";

export interface ReferralReportItem {
  userId: string;
  name: string;
  email: string;
  userType: "NORMAL" | "OMNI";
  totalReferrals: number;
  totalEarnings: number;
}

export interface ReferralReportResponse {
  data: ReferralReportItem[];
  page: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
}

export interface ReferralReportParams {
  search?: string;
  minEarnings?: number;
  userType?: "NORMAL" | "OMNI";
  page?: number;
  limit?: number;
}

export const getReferralReportApi = (params: ReferralReportParams) =>
  api.get<ReferralReportResponse>("/admin/referral-report", {
    params,
  });

export const exportReferralCSVApi = () =>
  api.get("/admin/referral-report/export/csv", {
    responseType: "blob",
  });

export const exportReferralPDFApi = () =>
  api.get("/admin/referral-report/export/pdf", {
    responseType: "blob",
  });

export const processPayoutApi = (userId: string) =>
  api.post("/admin/payouts/process", { userId });


export interface LeaderboardItem {
  userId: string;
  name: string;
  email: string;
  userType: "NORMAL" | "OMNI";
  totalReferrals: number;
  totalEarnings: number;
}

export const getLeaderboardApi = () =>
  api.get<{ data: LeaderboardItem[] }>("/admin/leaderboard");
