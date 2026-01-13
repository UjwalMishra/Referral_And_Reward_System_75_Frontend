import api from "./axios";

export interface UserDashboardData {
  name: string;
  email: string;
  userType: "NORMAL" | "OMNI";
  referralCode: string;
  totalReferrals: number;
  totalEarnings: number;
}

export const getUserDashboardApi = () =>
  api.get<{ data: UserDashboardData }>("/users/dashboard");
