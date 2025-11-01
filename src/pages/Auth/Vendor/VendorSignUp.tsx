import Spinner from "../../../components/Spinner/Spinner";
import FormInput from "../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRegisterVendorMutation } from "../../../service/auth";
import { useNavigate } from "react-router-dom";
import { BrandIcon, BrandMobileIcon } from "../../../assets/svg/Product";
import { motion } from "framer-motion";
import { CheckCircle, MapPin } from "lucide-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useState } from "react";

interface FormData {
  fullName: string;
  businessName: string;
  password: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
}

const VendorSignup = () => {
  const navigate = useNavigate();
  const [registerVendor, { isLoading }] = useRegisterVendorMutation();
  const [isAddressError, setIsAddressError] = useState(false);
  const initialValues: FormData = {
    fullName: "",
    businessName: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
  };

  const onSubmit = async (formData: FormData) => {
    try {
      const apiPayload = {
        fullName: formData.fullName,
        businessName: formData.businessName,
        password: formData.password,
        emailOrPhoneNumber: formData.email,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
      };

      const response = await registerVendor(apiPayload).unwrap();

      if (response?.error) {
        toast.error(response?.data?.message);
      } else {
        toast.success(response?.message);
        navigate("/signin");
      }
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message ||
            "Registration failed"
          : "Registration failed";
      toast.error(errorMessage);
      console.log("Registration error", error);
    }
  };

  const formSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    businessName: Yup.string().required("Business name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
  });

  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit,
  });

  const text = "Join ashoBox Today";

  const handleAddressSelect = (selectedAddress: { label: string } | null) => {
    if (selectedAddress && selectedAddress.label) {
      setFieldValue("address", selectedAddress.label);
      setIsAddressError(false);
    } else {
      setIsAddressError(true);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-slate-50 via-white to-secColor-Light/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pryColor/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secColor/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pryColor/5 to-secColor/5 rounded-full blur-3xl"></div>
      </div>

      {/* Left Panel - Branding */}
      <section className="relative z-10 bg-gradient-to-br from-secColor-Light/20 via-white/80 to-white/60 backdrop-blur-sm w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-between border-r border-white/20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <BrandIcon className="lg:h-12 md:h-10 w-auto hidden md:block" />
          <BrandMobileIcon className="h-10 w-auto md:hidden" />
          <h1 className="font-bold text-2xl text-pryColor hidden md:block">
            ashoBox
          </h1>
        </motion.div>

        <div className="my-8 lg:my-0 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-pryColor font-bold text-4xl lg:text-5xl xl:text-6xl leading-tight">
              {text}
            </h1>

            <h2 className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
              Start Your Fashion Empire
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed md:pr-20">
              Join thousands of successful vendors who trust ashoBox to grow
              their fashion business. Create your account and start selling
              today.
            </p>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {[
              "Easy store setup in minutes",
              "Powerful analytics dashboard",
              "Secure payment processing",
              "24/7 customer support",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-pryColor to-secColor rounded-full"></div>
                <span className="text-gray-600">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:block space-y-3"
        >
          <p className="text-gray-500 text-sm">
            Join the fastest-growing fashion marketplace.
          </p>
          <p className="text-gray-500 text-sm">
            Your success story starts here.
          </p>
        </motion.div>
      </section>

      {/* Right Panel - Sign Up Form */}
      <motion.section
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full lg:w-1/2 bg-white/80 backdrop-blur-xl px-6 lg:px-12 xl:px-20 py-8 lg:py-0 flex items-center"
      >
        <div className="w-full max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 space-y-4"
          >
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pryColor to-secColor bg-clip-text text-transparent">
              Create Vendor Account
            </h1>
            <p className="text-gray-600 text-lg">
              Join us to showcase your fashion collection and reach thousands of
              fashion enthusiasts.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                placeholder="Full Name"
                type="text"
                id="fullName"
                name="fullName"
                error={touched.fullName ? errors.fullName : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.fullName}
              />
              <FormInput
                placeholder="Business Name"
                type="text"
                id="businessName"
                name="businessName"
                error={touched.businessName ? errors.businessName : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.businessName}
              />
            </div>

            <FormInput
              placeholder="Email Address"
              type="email"
              id="email"
              name="email"
              error={touched.email ? errors.email : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.email}
            />

            <motion.div
              key="google-autocomplete"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {/* <label className="block text-sm font-medium text-gray-700">
                Delivery Address <span className="text-red-500">*</span>
              </label> */}
              <div className="relative">
                <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                  selectProps={{
                    onChange: handleAddressSelect,
                    placeholder: "Start typing your address...",
                    className: "w-full",
                    styles: {
                      control: (provided: Record<string, unknown>) => ({
                        ...provided,
                        minHeight: "48px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#3b82f6",
                        },
                        "&:focus-within": {
                          borderColor: "#3b82f6",
                          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                        },
                      }),
                      placeholder: (provided: Record<string, unknown>) => ({
                        ...provided,
                        color: "#9ca3af",
                      }),
                    },
                  }}
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {((touched.address && errors.address) || isAddressError) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-xs text-red-600"
                >
                  {/* <AlertCircle className="w-4 h-4" /> */}
                  {(errors.address as string) || "Please enter a valid address"}
                </motion.div>
              )}
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                We'll use Google Maps to be easily located
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                placeholder="Phone Number"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                error={touched.phoneNumber ? errors.phoneNumber : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.phoneNumber}
              />

              <FormInput
                placeholder="City"
                type="text"
                id="city"
                name="city"
                error={touched.city ? errors.city : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.city}
              />
            </div>

            <FormInput
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              error={touched.password ? errors.password : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.password}
            />

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pryColor to-pryColor/90 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pryColor focus:ring-offset-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Create Account"}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-pryColor cursor-pointer font-semibold hover:underline transition-all"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </motion.span>
            </p>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default VendorSignup;
