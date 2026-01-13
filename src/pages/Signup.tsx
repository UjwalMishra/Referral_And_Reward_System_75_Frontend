import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupApi } from "../api/auth.api";
import { setAccessToken } from "../utils/token";
import { signupSchema, type SignupFormData } from "../validations/auth.validation";


const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userType: "NORMAL",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await signupApi(data);
      setAccessToken(res.data.accessToken);
      navigate("/dashboard");
    } catch (err: any) {
      setError("root", {
        message: err.response?.data?.message || "Signup failed",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white border rounded-lg shadow-sm p-6 flex flex-col gap-5"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-semibold">Create your account</h1>
          <p className="text-sm text-gray-500">
            Join and start earning with referrals
          </p>
        </div>

        {/* Global error */}
        {errors.root && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-3 py-2">
            {errors.root.message}
          </div>
        )}

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* User Type */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            User Type
          </label>
          <select
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            {...register("userType")}
          >
            <option value="NORMAL">Normal User</option>
            <option value="OMNI">Omni User</option>
          </select>
        </div>

        {/* Referral Code */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Referral Code (optional)
          </label>
          <input
            type="text"
            placeholder="ABC123"
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            {...register("referralCode")}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-gray-900 text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Signup"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-900 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
