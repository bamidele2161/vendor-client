import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import FormInput from "../../../components/FormInput";
import AuthShell from "../../../components/Auth/AuthShell";
import { Button } from "../../../components/ui/button";
import { useVerifyOtpMutation } from "../../../service/auth";

const VerifyOTP = () => {
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(300);
  const email = location.state?.email;
  useEffect(() => { if (!email) { navigate("/forgot-password"); return; } const timer = setInterval(() => setTimeLeft((time) => { if (time <= 1) { clearInterval(timer); return 0; } return time - 1; }), 1000); return () => clearInterval(timer); }, [email, navigate]);
  const onSubmit = async ({ otp }: { otp: string }) => {
    try { const response = await verifyOtp({ email, otp: otp.trim() }).unwrap(); toast.success("OTP verified successfully"); navigate("/forgot-password/reset-password", { state: { resetToken: response?.resetToken, email } }); }
    catch (error: unknown) { const message = error && typeof error === "object" && "data" in error ? (error.data as { message?: string })?.message || "Invalid OTP" : "Invalid OTP"; toast.error(message); }
  };
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({ initialValues: { otp: "" }, validationSchema: Yup.object({ otp: Yup.string().required("OTP is required").length(6, "OTP must be 6 digits").matches(/^\d+$/, "OTP must contain only numbers") }), onSubmit });
  const timer = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`;
  return <AuthShell eyebrow="Email verification" title="Check your inbox." description={`Enter the six-digit code sent to ${email || "your email"}.`} backTo="/forgot-password" compact>
    <div className="mb-5 flex items-center justify-between rounded-xl bg-[#DCE4E8] px-4 py-3 text-xs"><span className="font-medium text-[#566170]">Code expires in</span><span className={`font-mono font-bold ${timeLeft < 60 ? "text-red-600" : "text-[#151A22]"}`}>{timer}</span></div>
    <form className="space-y-5" onSubmit={handleSubmit}>
      <FormInput label="Verification code" placeholder="000000" type="text" id="otp" name="otp" error={touched.otp ? errors.otp : undefined} onBlur={handleBlur} onChange={handleChange} defaultValue={values.otp}/>
      <Button size="lg" className="w-full" type="submit" disabled={isLoading || timeLeft === 0}>{isLoading ? <Spinner/> : timeLeft === 0 ? "Code expired" : "Verify code"}</Button>
    </form>
    <button className="mt-6 w-full text-center text-xs font-semibold text-[#566170] hover:text-[#151A22]" onClick={() => navigate("/forgot-password")}>Use a different email or request a new code</button>
  </AuthShell>;
};
export default VerifyOTP;
