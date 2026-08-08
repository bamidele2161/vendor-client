import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import FormInput from "../../../components/FormInput";
import AuthShell from "../../../components/Auth/AuthShell";
import { Button } from "../../../components/ui/button";
import { useResetPasswordMutation } from "../../../service/auth";

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const resetToken = location.state?.resetToken;
  const email = location.state?.email;
  useEffect(() => { if (!resetToken || !email) navigate("/forgot-password"); }, [resetToken, email, navigate]);
  const onSubmit = async ({ newPassword }: { newPassword: string; confirmPassword: string }) => {
    try { await resetPassword({ resetToken, newPassword }).unwrap(); toast.success("Password reset successfully! Please login with your new password."); navigate("/signin"); }
    catch (error: unknown) { const message = error && typeof error === "object" && "data" in error ? (error.data as { message?: string })?.message || "Failed to reset password" : "Failed to reset password"; toast.error(message); }
  };
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({ initialValues: { newPassword: "", confirmPassword: "" }, validationSchema: Yup.object({ newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("New password is required"), confirmPassword: Yup.string().oneOf([Yup.ref("newPassword")], "Passwords must match").required("Please confirm your password") }), onSubmit });
  return <AuthShell eyebrow="Final step" title="Create a new password." description="Choose a secure password for your Ashobox vendor account." backTo="/forgot-password/verify-otp" compact>
    <form className="space-y-5" onSubmit={handleSubmit}>
      <FormInput label="New password" placeholder="At least 6 characters" type="password" id="newPassword" name="newPassword" error={touched.newPassword ? errors.newPassword : undefined} onBlur={handleBlur} onChange={handleChange} defaultValue={values.newPassword}/>
      <FormInput label="Confirm password" placeholder="Enter it again" type="password" id="confirmPassword" name="confirmPassword" error={touched.confirmPassword ? errors.confirmPassword : undefined} onBlur={handleBlur} onChange={handleChange} defaultValue={values.confirmPassword}/>
      <Button size="lg" className="w-full" type="submit" disabled={isLoading}>{isLoading ? <Spinner/> : "Set new password"}</Button>
    </form>
  </AuthShell>;
};
export default ResetPassword;
