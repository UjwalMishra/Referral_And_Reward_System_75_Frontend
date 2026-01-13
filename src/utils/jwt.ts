type JwtPayload = {
  userId: string;
  userType: "NORMAL" | "OMNI";
  role: "USER" | "ADMIN";
  exp: number;
};

export const getUserFromToken = (): JwtPayload | null => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const base64Payload = token.split(".")[1];
    return JSON.parse(atob(base64Payload)) as JwtPayload;
  } catch {
    return null;
  }
};
