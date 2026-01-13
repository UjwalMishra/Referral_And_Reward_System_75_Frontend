import api from "./axios";

export const loginApi = (data: {
  email: string;
  password: string;
}) => api.post("/auth/login", data);

export const signupApi = (data: {
  name: string;
  email: string;
  password: string;
  userType?: "NORMAL" | "OMNI";
  referralCode?: string;
}) => api.post("/auth/signup", data);

export const logoutApi = () => api.post("/auth/logout");
