import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { MapPin } from "@icons";
import Spinner from "../../../components/Spinner/Spinner";
import FormInput from "../../../components/FormInput";
import AuthShell from "../../../components/Auth/AuthShell";
import { Button } from "../../../components/ui/button";
import { useRegisterVendorMutation } from "../../../service/auth";
import { areas } from "../../../util";

interface FormData { fullName: string; businessName: string; password: string; email: string; phoneNumber: string; address: string; city: string; }

const VendorSignup = () => {
  const navigate = useNavigate();
  const [registerVendor, { isLoading }] = useRegisterVendorMutation();
  const [isAddressError, setIsAddressError] = useState(false);
  const initialValues: FormData = { fullName: "", businessName: "", password: "", email: "", phoneNumber: "", address: "", city: "" };
  const onSubmit = async (formData: FormData) => {
    try {
      const apiPayload = { fullName: formData.fullName, businessName: formData.businessName, password: formData.password, email: formData.email.toLowerCase().trim(), address: formData.address, phoneNumber: formData.phoneNumber, city: formData.city };
      const response = await registerVendor(apiPayload).unwrap();
      if (response?.error) toast.error(response?.data?.message);
      else { toast.success(response?.message); navigate("/signin"); }
    } catch (error: unknown) {
      const message = error && typeof error === "object" && "data" in error ? (error.data as { message?: string })?.message || "Registration failed" : "Registration failed";
      toast.error(message);
    }
  };
  const { values, touched, errors, setFieldValue, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: Yup.object({ fullName: Yup.string().required("Full name is required"), businessName: Yup.string().required("Business name is required"), email: Yup.string().email("Invalid email format").required("Email is required"), phoneNumber: Yup.string().required("Phone number is required"), password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"), address: Yup.string().required("Address is required"), city: Yup.string().required("City is required") }),
    onSubmit,
  });
  const handleAddressSelect = (selectedAddress: { label: string } | null) => {
    if (selectedAddress?.label) { setFieldValue("address", selectedAddress.label); setIsAddressError(false); }
    else setIsAddressError(true);
  };
  return (
    <AuthShell eyebrow="Vendor application" title="Open your Ashobox store." description="Tell us about you and your business. You can shape your storefront after your account is approved.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput label="Full name" placeholder="Your full name" type="text" id="fullName" name="fullName" error={touched.fullName ? errors.fullName : undefined} onBlur={handleBlur} onChange={handleChange} defaultValue={values.fullName}/>
          <FormInput label="Business name" placeholder="Your label or store" type="text" id="businessName" name="businessName" error={touched.businessName ? errors.businessName : undefined} onBlur={handleBlur} onChange={handleChange} defaultValue={values.businessName}/>
        </div>
        <FormInput label="Email address" placeholder="you@example.com" type="email" id="email" name="email" error={touched.email ? errors.email : undefined} onBlur={handleBlur} onChange={handleChange} defaultValue={values.email}/>
        <div>
          <label className="mb-2 block text-xs font-semibold text-[#242B35]">Business address</label>
          <div className="relative">
            <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_API_KEY} selectProps={{ onChange: handleAddressSelect, placeholder: "Start typing your address...", styles: { control: (base: Record<string, unknown>) => ({ ...base, minHeight: "48px", border: "1px solid rgba(21,26,34,.1)", borderRadius: "12px", background: "rgba(255,255,255,.65)", boxShadow: "none" }) } }}/>
            <MapPin className="pointer-events-none absolute right-3 top-4 h-4 w-4 text-[#6F8294]"/>
          </div>
          {((touched.address && errors.address) || isAddressError) && <p className="mt-1.5 text-xs font-medium text-red-600">{(errors.address as string) || "Please enter a valid address"}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput label="Phone number" placeholder="Phone number" type="tel" id="phoneNumber" name="phoneNumber" error={touched.phoneNumber ? errors.phoneNumber : undefined} onBlur={handleBlur} onChange={handleChange} defaultValue={values.phoneNumber}/>
          <FormInput label="Business area" id="city" name="city" placeholder="Select your area" type="cSelect" selectOptions={areas} keyPropertyName="name" defaultValue={values.city} valuePropertyName="name" required itemPropertyName="name" onChange={handleChange} onBlur={handleBlur} error={touched.city ? errors.city : undefined}/>
        </div>
        <FormInput label="Password" placeholder="At least 6 characters" type="password" id="password" name="password" error={touched.password ? errors.password : undefined} onBlur={handleBlur} onChange={handleChange} defaultValue={values.password}/>
        <Button size="lg" className="w-full" type="submit" disabled={isLoading}>{isLoading ? <Spinner/> : "Create vendor account"}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-[#566170]">Already have an account? <button className="font-semibold text-[#151A22] underline-offset-4 hover:underline" onClick={() => navigate("/signin")}>Sign in</button></p>
    </AuthShell>
  );
};
export default VendorSignup;
