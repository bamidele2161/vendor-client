import Spinner from "../../../components/Spinner/Spinner";
import FormInput from "../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useVerifyOtpMutation } from "../../../service/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { BrandIcon, BrandMobileIcon } from "../../../assets/svg/Product";
import { BackArrowIcon } from "../../../assets/svg/CustomSVGs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const VerifyOTP = () => {
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const initialValues = {
    otp: "",
  };

  const onSubmit = async (formData: { otp: string }) => {
    try {
      const response = await verifyOtp({
        email: email,
        otp: formData.otp.trim(),
      }).unwrap();

      toast.success("OTP verified successfully");
      // Navigate to reset password page with reset token
      navigate("/forgot-password/reset-password", {
        state: {
          resetToken: response?.resetToken,
          email: email,
        },
      });
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message || "Invalid OTP"
          : "Invalid OTP";
      toast.error(errorMessage);
      console.log("OTP verification error", error);
    }
  };

  const formSchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .length(6, "OTP must be 6 digits")
      .matches(/^\d+$/, "OTP must contain only numbers"),
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
            ashobox
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
              Verify Your Email
            </h1>

            <h2 className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
              Check Your Inbox
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed md:pr-20">
              We've sent a 6-digit verification code to{" "}
              <span className="font-semibold text-pryColor">{email}</span>.
              Enter the code below to continue.
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
              "Code expires in 5 minutes",
              "Secure verification process",
              "One-time use only",
              "Account protection active",
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
            Didn't receive the code? Check your spam folder.
          </p>
          <p className="text-gray-500 text-sm">
            The verification code is valid for 5 minutes only.
          </p>
        </motion.div>
      </section>

      {/* Right Panel - OTP Form */}
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
            onClick={() => navigate("/forgot-password")}
          >
            <BackArrowIcon className="w-5 h-5" />
            <span>Back</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 space-y-4"
          >
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pryColor to-secColor bg-clip-text text-transparent">
              Enter Verification Code
            </h1>
            <p className="text-gray-600 text-lg">
              Please enter the 6-digit code we sent to your email address.
            </p>

            {/* Timer */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Code expires in:</span>
              <span
                className={`font-mono font-semibold ${
                  timeLeft < 60 ? "text-red-500" : "text-pryColor"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <FormInput
              placeholder="Enter 6-digit code"
              type="text"
              id="otp"
              name="otp"
              error={touched.otp ? errors.otp : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.otp}
            />

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pryColor to-pryColor/90 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pryColor focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading || timeLeft === 0}
            >
              {isLoading ? (
                <Spinner />
              ) : timeLeft === 0 ? (
                "Code Expired"
              ) : (
                "Verify Code"
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center space-y-4"
          >
            <p className="text-gray-600">
              Didn't receive the code?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-pryColor cursor-pointer font-semibold hover:underline transition-all"
                onClick={() => navigate("/forgot-password")}
              >
                Resend Code
              </motion.span>
            </p>

            <p className="text-gray-600">
              Wrong email?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-pryColor cursor-pointer font-semibold hover:underline transition-all"
                onClick={() => navigate("/forgot-password")}
              >
                Change Email
              </motion.span>
            </p>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default VerifyOTP;
