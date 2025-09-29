import { useState } from "react";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import FormInput from "../../../components/FormInput";
import {
  useRequestPasswordResetMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} from "../../../service/auth";

type ResetStep = "SEND_OTP" | "VERIFY_OTP" | "RESET_PASSWORD";

const ResetStep = {
  SEND_OTP: "SEND_OTP",
  VERIFY_OTP: "VERIFY_OTP",
  RESET_PASSWORD: "RESET_PASSWORD",
} as const;

const ResetPassword = () => {
  const { userInfo } = useAppSelector(selectAuth);
  const [step, setStep] = useState<ResetStep>(ResetStep.SEND_OTP);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [requestPasswordReset] = useRequestPasswordResetMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [resetPassword] = useResetPasswordMutation();

  const email = userInfo?.email;

  const handleSendOtp = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await requestPasswordReset({ email }).unwrap();
      setSuccess("OTP sent to your email successfully!");
      setStep(ResetStep.VERIFY_OTP);
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === "object" && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : "Failed to send OTP. Please try again.";
      setError(errorMessage || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await verifyOtp({ email: email!, otp }).unwrap();
      setResetToken(response.resetToken);
      setSuccess("OTP verified successfully!");
      setStep(ResetStep.RESET_PASSWORD);
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === "object" && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : "Invalid OTP. Please try again.";
      setError(errorMessage || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await resetPassword({ resetToken, newPassword }).unwrap();
      setSuccess(
        "Password reset successfully! You can now login with your new password."
      );
      // Reset form
      setStep(ResetStep.SEND_OTP);
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setResetToken("");
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === "object" && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : "Failed to reset password. Please try again.";
      setError(errorMessage || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600">
          {step === ResetStep.SEND_OTP && "We'll send an OTP to your email"}
          {step === ResetStep.VERIFY_OTP && "Enter the OTP sent to your email"}
          {step === ResetStep.RESET_PASSWORD && "Create your new password"}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              step === ResetStep.SEND_OTP
                ? "bg-pryColor text-white"
                : "bg-green-500 text-white"
            }`}
          >
            1
          </div>
          <div
            className={`w-8 h-1 ${
              step === ResetStep.VERIFY_OTP || step === ResetStep.RESET_PASSWORD
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              step === ResetStep.VERIFY_OTP
                ? "bg-pryColor text-white"
                : step === ResetStep.RESET_PASSWORD
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            2
          </div>
          <div
            className={`w-8 h-1 ${
              step === ResetStep.RESET_PASSWORD ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              step === ResetStep.RESET_PASSWORD
                ? "bg-pryColor text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            3
          </div>
        </div>
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}

      <FormInput
        label="Email"
        type="email"
        defaultValue={email}
        disabled
        id="email"
        className="mb-4"
      />

      {step === ResetStep.SEND_OTP && (
        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full bg-pryColor text-white px-6 py-3 rounded-md hover:bg-pryColor transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending OTP...
            </>
          ) : (
            "Send OTP"
          )}
        </button>
      )}

      {step === ResetStep.VERIFY_OTP && (
        <div className="space-y-4">
          <FormInput
            label="Enter OTP"
            type="text"
            defaultValue={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="mb-4"
            id="otp"
          />
          <div className="flex space-x-3">
            <button
              onClick={() => setStep(ResetStep.SEND_OTP)}
              className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="flex-1 bg-pryColor text-white px-6 py-3 rounded-md hover:bg-pryColor transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        </div>
      )}

      {step === ResetStep.RESET_PASSWORD && (
        <div className="space-y-4">
          <FormInput
            label="New Password"
            type="password"
            id="newPassword"
            defaultValue={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="mb-4"
          />
          <FormInput
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            defaultValue={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="mb-4"
          />
          <div className="flex space-x-3">
            <button
              onClick={() => setStep(ResetStep.VERIFY_OTP)}
              className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
