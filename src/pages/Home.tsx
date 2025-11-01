import { BrandIcon, BrandMobileIcon } from "../assets/svg/Product";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer/Footer";
import {
  ShoppingBag,
  TrendingUp,
  Users,
  Shield,
  BarChart3,
  Zap,
  Star,
  CheckCircle,
} from "lucide-react";
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";
import home3 from "../assets/home3.jpg";
const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Product Management",
      description:
        "Easily manage your inventory, add new products, and track stock levels in real-time.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Sales Analytics",
      description:
        "Get detailed insights into your sales performance with comprehensive analytics and reports.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Management",
      description:
        "Build stronger relationships with your customers through our integrated CRM system.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description:
        "Process payments securely with our integrated payment gateway and fraud protection.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Performance Tracking",
      description:
        "Monitor your business performance with real-time metrics and KPI dashboards.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast & Reliable",
      description:
        "Experience lightning-fast performance with 99.9% uptime guarantee.",
    },
  ];

  const benefits = [
    "Increase sales by up to 40%",
    "Reduce operational costs",
    "24/7 customer support",
    "Mobile-responsive design",
    "Advanced security features",
    "Easy integration",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-secColor-Light/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pryColor/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secColor/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pryColor/5 to-secColor/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 md:px-0"
        >
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="py-8 lg:py-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BrandIcon className="lg:h-12 md:h-10 w-auto hidden md:block" />
                <BrandMobileIcon className="h-10 w-auto md:hidden" />
                <h1 className="font-bold text-2xl text-pryColor hidden md:block">
                  ashoBox
                </h1>
              </div>
            </div>
          </motion.header>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pryColor/10 to-secColor/10 backdrop-blur-sm rounded-full px-4 py-2 border border-pryColor/20"
                >
                  <div className="w-2 h-2 bg-pryColor rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-pryColor">
                    Trusted by 1000+ vendors
                  </span>
                </motion.div>

                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Grow Your{" "}
                  <span className="bg-gradient-to-r from-pryColor to-secColor bg-clip-text text-transparent">
                    Business
                  </span>{" "}
                  with ashoBox
                </h2>

                <h3 className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                  The Ultimate Vendor Platform
                </h3>

                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Streamline your operations, boost sales, and deliver
                  exceptional customer experiences with our comprehensive vendor
                  management platform.
                </p>
              </div>

              {/* Benefits List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.slice(0, 4).map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-pryColor" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-pryColor to-pryColor/90 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pryColor focus:ring-offset-2 overflow-hidden"
                  onClick={() => navigate("/signup")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    Start Selling Today
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-pryColor font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-pryColor/20 hover:border-pryColor/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pryColor focus:ring-offset-2"
                  onClick={() => navigate("/signin")}
                >
                  <span className="flex items-center gap-2">
                    Sign In
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </span>
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center gap-8 pt-8"
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
                    Join 1000+ happy vendors
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    4.9/5 rating
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Images */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
                >
                  <img
                    src={home1}
                    alt="Vendor Dashboard"
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>

                {/* Floating Secondary Images */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute -top-6 -right-4 md:-right-6 w-32 h-32 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/20"
                >
                  <img
                    src={home2}
                    alt="Analytics"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-8 -left-4 md:-left-8 w-28 h-28 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/20"
                >
                  <img
                    src={home3}
                    alt="Products"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 -left-4 md:-left-12 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/20"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pryColor">40%</div>
                    <div className="text-xs text-gray-600">Sales Increase</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="py-20"
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pryColor/10 to-secColor/10 backdrop-blur-sm rounded-full px-4 py-2 border border-pryColor/20 mb-6"
              >
                <Zap className="w-4 h-4 text-pryColor" />
                <span className="text-sm font-medium text-pryColor">
                  Powerful Features
                </span>
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-pryColor to-secColor bg-clip-text text-transparent">
                  Succeed
                </span>
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive platform provides all the tools and features
                you need to manage, grow, and scale your business effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pryColor/5 to-secColor/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-pryColor to-secColor rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="py-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pryColor/5 via-white/50 to-secColor/5 rounded-3xl"></div>

              <div className="relative bg-secColor-Light backdrop-blur-xl rounded-3xl shadow-xl p-8 lg:p-16 border border-white/20">
                <div className="text-center space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pryColor to-secColor bg-clip-text text-transparent">
                      Ready to Transform Your Business?
                    </h3>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      Join thousands of successful vendors who have already
                      transformed their business with ashoBox. Start your
                      journey today!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative px-8 py-4 bg-gradient-to-r from-pryColor to-pryColor/90 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pryColor focus:ring-offset-2 overflow-hidden"
                      onClick={() => navigate("/signup")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative flex items-center gap-2">
                        Get Started Free
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-pryColor font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-pryColor/20 hover:border-pryColor/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pryColor focus:ring-offset-2"
                    >
                      <span className="flex items-center gap-2">
                        Learn More
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </motion.button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                    {[
                      {
                        number: "1k+",
                        label: "Active Vendors",
                        icon: <Users className="w-8 h-8" />,
                      },
                      {
                        number: "99.9%",
                        label: "Uptime",
                        icon: <Zap className="w-8 h-8" />,
                      },
                      {
                        number: "24/7",
                        label: "Support",
                        icon: <Shield className="w-8 h-8" />,
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 justify-center items-center flex flex-col shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-pryColor to-secColor rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                          {stat.icon}
                        </div>
                        <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pryColor to-secColor bg-clip-text text-transparent mb-2">
                          {stat.number}
                        </div>
                        <div className="text-gray-600 font-medium">
                          {stat.label}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-pryColor/5 to-secColor/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
