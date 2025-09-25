import { useState } from "react";
import { BrandIcon, BrandMobileIcon } from "../assets/svg/Product";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-hero-pattern bg-no-repeat bg-cover bg-center justify-between">
      {/* Header */}

      {/* Main Content */}
      <main className="px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          <header className="py-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <BrandIcon className="lg:h-10 md:h-8 w-auto hidden md:block" />

                <BrandMobileIcon className="h-8 w-auto md:hidden" />
                <h1 className="font-bold text-xl text-pryColor hidden md:block">
                  ashoBox
                </h1>
              </div>
            </div>
          </header>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mt-6">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Welcome to{" "}
                  <span className="bg-pryColor bg-clip-text text-transparent">
                    Ashobox
                  </span>
                </h2>
                <h3 className="text-2xl lg:text-3xl font-semibold text-muted-foreground">
                  Elevate Your Vendor Experience
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Seamlessly manage your dashboard, track analytics, and deliver
                  exceptional user experiences with our powerful Vendor
                  platform.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className={`px-8 py-4 bg-pryColor text-white font-semibold 
                    rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 
                    hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pryColor 
                    focus:ring-offset-2 ${
                      hoveredButton === "get-started" ? "scale-105" : ""
                    }`}
                  onMouseEnter={() => setHoveredButton("get-started")}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </button>

                <button
                  className={`px-8 py-4 bg-secColor text-white 
                    font-semibold rounded-xl shadow-md hover:shadow-lg transform 
                    transition-all duration-300 hover:-translate-y-1 focus:outline-none 
                    focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
                      hoveredButton === "login" ? "scale-105" : ""
                    }`}
                  onMouseEnter={() => setHoveredButton("login")}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => navigate("/signin")}
                >
                  Login
                </button>
              </div>
            </div>

            {/* Right Content - Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative bg-secColor-Light rounded-3xl shadow-lg p-8 lg:p-12">
                {/* Dashboard Preview */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="h-3 bg-pryColor rounded w-24"></div>
                      <div className="h-2 bg-pryColor rounded w-16"></div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-hero rounded-lg"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secColor rounded-xl p-4 space-y-2">
                      <div className="h-2 bg-pryColor rounded w-12"></div>
                      <div className="h-6 bg-pryColor rounded w-8"></div>
                    </div>
                    <div className="bg-secColor rounded-xl p-4 space-y-2">
                      <div className="h-2 bg-pryColor rounded w-16"></div>
                      <div className="h-6 bg-secondary rounded w-12"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-2 bg-pryColor rounded w-full"></div>
                    <div className="h-2 bg-pryColor rounded w-3/4"></div>
                    <div className="h-2 bg-pryColor rounded w-5/6"></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-pryColor rounded-2xl shadow-lg animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-secColor rounded-xl shadow-md"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="bg-secColor-Light rounded-2xl shadow-sm p-8 text-center space-y-4"
          >
            <p className="text-lg font-semibold text-foreground">
              Trusted by fashion store owners across the industry
            </p>
            <p className="text-muted-foreground">
              Your go-to platform for managing, scaling, and succeeding in
              digital operations.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-pryColor">1k+</div>
                <div className="text-sm text-muted-foreground">
                  Active Vendors
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-pryColor">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-pryColor">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
