import Spinner from "../../../components/Spinner/Spinner";
import FormInput from "../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../../service/auth";
import { saveUserInfo } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { BrandIcon, BrandMobileIcon } from "../../../assets/svg/Product";
import { useCookies } from "../../../hooks/cookiesHook";
import { motion } from "framer-motion";

const VendorSignin = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { setCookies } = useCookies();
  const initialValues = {
    password: "",
    emailOrPhoneNumber: "",
  };

  const onSubmit = async (formData: {
    password: string;
    emailOrPhoneNumber: string;
  }) => {
    try {
      const requiredData = {
        password: formData.password,
        emailOrPhoneNumber: formData.emailOrPhoneNumber.toLowerCase().trim(),
      };
      const response = await login(requiredData).unwrap();

      if (response?.error) {
        toast.error(response?.data?.message);
      } else {
        if (response?.data?.role === "VENDOR") {
          dispatch(saveUserInfo(response?.data));
          setCookies("ashoboxToken", response?.data?.access_token);
          toast.success(response?.message);
          navigate("/dashboard");
        } else {
          toast.error("You are not authorized as a Vendor!");
        }
      }
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message || "Login failed"
          : "Login failed";
      toast.error(errorMessage);
      console.log("Login error", error);
    }
  };

  const formSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    emailOrPhoneNumber: Yup.string().required(
      "Email or Phone number is required"
    ),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  const text = "Welcome Back to ashobox";

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
              {text}
            </h1>

            <h2 className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
              Continue Your Fashion Journey
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed md:pr-20">
              Access your vendor dashboard to manage your store, track sales,
              and deliver exceptional fashion experiences to your customers.
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-8"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-br from-pryColor to-secColor rounded-full border-2 border-white shadow-sm"
                  ></div>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                Trusted by 1000+ vendors
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:block space-y-3"
        >
          <p className="text-gray-500 text-sm">
            Trusted by fashion entrepreneurs across the industry.
          </p>
          <p className="text-gray-500 text-sm">
            Your go-to platform for selling, scaling, and succeeding in fashion.
          </p>
        </motion.div>
      </section>

      {/* Right Panel - Login Form */}
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
              Sign In
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome back! Please sign in to your account.
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
              placeholder="Email or phone number"
              type="text"
              id={"emailOrPhoneNumber"}
              name="emailOrPhoneNumber"
              error={
                touched.emailOrPhoneNumber
                  ? errors.emailOrPhoneNumber
                  : undefined
              }
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.emailOrPhoneNumber}
            />
            <FormInput
              placeholder="Password"
              type="password"
              id={"password"}
              name="password"
              error={touched.password ? errors.password : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.password}
            />

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                className="text-pryColor hover:text-pryColor/80 text-sm font-medium transition-colors"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pryColor to-pryColor/90 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pryColor focus:ring-offset-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Sign In"}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-pryColor cursor-pointer font-semibold hover:underline transition-all"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </motion.span>
            </p>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default VendorSignin;
