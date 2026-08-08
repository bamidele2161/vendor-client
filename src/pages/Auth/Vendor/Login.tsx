import Spinner from "../../../components/Spinner/Spinner";
import FormInput from "../../../components/FormInput";
import AuthShell from "../../../components/Auth/AuthShell";
import { Button } from "../../../components/ui/button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../../service/auth";
import { saveUserInfo } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { useCookies } from "../../../hooks/cookiesHook";

const VendorSignin = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { setCookies } = useCookies();
  const initialValues = { password: "", emailOrPhoneNumber: "" };
  const onSubmit = async (formData: { password: string; emailOrPhoneNumber: string }) => {
    try {
      const requiredData = { password: formData.password, emailOrPhoneNumber: formData.emailOrPhoneNumber.toLowerCase().trim() };
      const response = await login(requiredData).unwrap();
      if (response?.error) toast.error(response?.data?.message);
      else if (response?.data?.role === "VENDOR") {
        dispatch(saveUserInfo(response?.data));
        setCookies("ashoboxVendorToken", response?.data?.access_token);
        toast.success(response?.message);
        navigate("/dashboard");
      } else toast.error("You are not authorized as a Vendor!");
    } catch (error: unknown) {
      const message = error && typeof error === "object" && "data" in error ? (error.data as { message?: string })?.message || "Login failed" : "Login failed";
      toast.error(message);
    }
  };
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: Yup.object({ password: Yup.string().required("Password is required"), emailOrPhoneNumber: Yup.string().required("Email or Phone number is required") }),
    onSubmit,
  });
  return (
    <AuthShell eyebrow="Welcome back" title="Sign in to your studio." description="Manage your collection, fulfil orders and see how your business is moving." compact>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <FormInput label="Email or phone number" placeholder="you@example.com" type="text" id="emailOrPhoneNumber" name="emailOrPhoneNumber" error={touched.emailOrPhoneNumber ? errors.emailOrPhoneNumber : undefined} onBlur={handleBlur} onChange={handleChange} defaultValue={values.emailOrPhoneNumber}/>
        <div><FormInput label="Password" placeholder="Enter your password" type="password" id="password" name="password" error={touched.password ? errors.password : undefined} onBlur={handleBlur} onChange={handleChange} defaultValue={values.password}/><button type="button" className="mt-2 text-xs font-semibold text-[#566170] hover:text-[#151A22]" onClick={() => navigate("/forgot-password")}>Forgot password?</button></div>
        <Button size="lg" className="w-full" type="submit" disabled={isLoading}>{isLoading ? <Spinner/> : "Sign in"}</Button>
      </form>
      <p className="mt-7 text-center text-sm text-[#566170]">New to Ashobox? <button className="font-semibold text-[#151A22] underline-offset-4 hover:underline" onClick={() => navigate("/signup")}>Create a vendor account</button></p>
    </AuthShell>
  );
};
export default VendorSignin;
