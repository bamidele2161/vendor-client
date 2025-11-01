import Spinner from "../../../components/Spinner/Spinner";
import FormInput from "../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRequestPasswordResetMutation } from "../../../service/auth";
import { useNavigate } from "react-router-dom";
import { BrandIcon, BrandMobileIcon } from "../../../assets/svg/Product";
import { BackArrowIcon } from "../../../assets/svg/CustomSVGs";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const onSubmit = async (formData: { email: string }) => {
    try {
      const response = await requestPasswordReset({
        email: formData.email.toLowerCase().trim(),
      }).unwrap();

      if (response?.error) {
        toast.error(response?.message);
      } else {
        toast.success(response?.message || "OTP sent to your email");
        // Navigate to OTP verification page with email
        navigate("/forgot-password/verify-otp", {
          state: { email: formData.email.toLowerCase().trim() },
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message ||
            "Failed to send reset email"
          : "Failed to send reset email";
      toast.error(errorMessage);
      console.log("Password reset request error", error);
    }
  };

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

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
              Reset Your Password
            </h1>

            <h2 className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
              We'll Help You Get Back In
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed md:pr-20">
              Enter your email address and we'll send you a verification code to
              reset your password securely.
            </p>
          </motion.div>

          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {[
              "Secure password reset process",
              "Email verification required",
              "Account protection guaranteed",
              "Quick and easy recovery",
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
            Your account security is our top priority.
          </p>
          <p className="text-gray-500 text-sm">
            We use industry-standard encryption to protect your data.
          </p>
        </motion.div>
      </section>

      {/* Right Panel - Reset Form */}
      <motion.section
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full lg:w-1/2 bg-white/80 backdrop-blur-xl px-6 lg:px-12 xl:px-20 py-8 lg:py-0 flex items-center"
      >
        <div className="w-full max-w-lg mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-gray-600 hover:text-pryColor transition-colors mb-6"
            onClick={() => navigate("/signin")}
          >
            <BackArrowIcon className="w-5 h-5" />
            <span>Back to Login</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 space-y-4"
          >
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pryColor to-secColor bg-clip-text text-transparent">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-lg">
              No worries! Enter your email address and we'll send you a code to
              reset your password.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <FormInput
              placeholder="Enter your email address"
              type="email"
              id="email"
              name="email"
              error={touched.email ? errors.email : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.email}
            />

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pryColor to-pryColor/90 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pryColor focus:ring-offset-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Send Reset Code"}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Remember your password?{" "}
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

export default ForgotPassword;
