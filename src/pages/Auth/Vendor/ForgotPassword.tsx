import Spinner from "../../../components/Spinner/Spinner";
import FormInput from "../../../components/FormInput";
import AuthShell from "../../../components/Auth/AuthShell";
import { Button } from "../../../components/ui/button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRequestPasswordResetMutation } from "../../../service/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();
  const navigate = useNavigate();
  const onSubmit = async ({ email }: { email: string }) => {
    try {
      const normalizedEmail = email.toLowerCase().trim();
      const response = await requestPasswordReset({ email: normalizedEmail }).unwrap();
      if (response?.error) toast.error(response?.message);
      else { toast.success(response?.message || "OTP sent to your email"); navigate("/forgot-password/verify-otp", { state: { email: normalizedEmail } }); }
    } catch (error: unknown) {
      const message = error && typeof error === "object" && "data" in error ? (error.data as { message?: string })?.message || "Failed to send reset email" : "Failed to send reset email";
      toast.error(message);
    }
  };
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({ initialValues: { email: "" }, validationSchema: Yup.object({ email: Yup.string().email("Invalid email format").required("Email is required") }), onSubmit });
  return <AuthShell eyebrow="Account recovery" title="Let’s get you back in." description="Enter the email connected to your vendor account. We’ll send a six-digit verification code." backTo="/signin" compact>
    <form className="space-y-5" onSubmit={handleSubmit}>
      <FormInput label="Email address" placeholder="you@example.com" type="email" id="email" name="email" error={touched.email ? errors.email : undefined} onBlur={handleBlur} onChange={handleChange} defaultValue={values.email}/>
      <Button size="lg" className="w-full" type="submit" disabled={isLoading}>{isLoading ? <Spinner/> : "Send verification code"}</Button>
    </form>
    <p className="mt-6 text-center text-xs leading-5 text-[#6F8294]">The code is time-limited and can only be used once.</p>
  </AuthShell>;
};
export default ForgotPassword;
