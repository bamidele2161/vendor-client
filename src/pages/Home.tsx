import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  PackageCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { BrandMobileIcon } from "../assets/svg/Product";
import { Button } from "../components/ui/button";
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";
import home3 from "../assets/home3.jpg";

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55 },
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-hidden bg-[#ECE9E1] text-[#151A22]">
      <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10">
        <button
          onClick={() => navigate("/")}
          aria-label="Ashobox vendor home"
          className="flex items-center gap-3"
        >
          <BrandMobileIcon className="h-7 w-auto" />
          <span className="hidden border-l border-[#151A22]/15 pl-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#566170] sm:block">
            Vendor studio
          </span>
        </button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate("/signin")}>
            Sign in
          </Button>
          <Button onClick={() => navigate("/signup")}>
            Open your store <ArrowRight size={15} />
          </Button>
        </div>
      </nav>

      <section className="mx-auto max-w-[1500px] px-4 pb-8 md:px-8 lg:px-10">
        <div className="relative min-h-[680px] overflow-hidden rounded-[2rem] bg-[#151A22] lg:min-h-[720px]">
          <img
            src={home1}
            alt="African fashion collection"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#151A22] via-[#151A22]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151A22] via-transparent to-black/10" />
          <div className="relative z-10 flex min-h-[680px] max-w-3xl flex-col justify-end p-6 pb-10 text-white sm:p-10 lg:min-h-[720px] lg:p-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#DCE4E8]"
            >
              <Sparkles size={14} /> Built for fashion businesses
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-spaceGrotesk text-[clamp(3.2rem,7vw,7.2rem)] font-semibold leading-[.88] tracking-[-0.065em]"
            >
              Your craft.
              <br />
              <span className="text-[#AEBCC7]">Your storefront.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-7 max-w-xl text-base leading-7 text-white/65 md:text-lg"
            >
              A focused workspace to present your collection, manage every
              order, and grow your fashion business on Ashobox.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                className="bg-black text-[#151A22] hover:bg-black/30"
                onClick={() => navigate("/signup")}
              >
                Become a vendor <ArrowRight size={16} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                onClick={() => navigate("/signin")}
              >
                Go to dashboard
              </Button>
            </motion.div>
          </div>
          <div className="absolute bottom-8 right-8 hidden rounded-full border border-white/15 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur md:block">
            Commerce, composed
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-12 px-5 py-20 md:px-10 lg:grid-cols-[.75fr_1.25fr] lg:py-28">
        <motion.div {...reveal}>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6F8294]">
            One calm workspace
          </p>
          <h2 className="mt-4 max-w-lg font-spaceGrotesk text-4xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl">
            Less admin.
            <br />
            More momentum.
          </h2>
        </motion.div>
        <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-[#151A22]/10 bg-[#151A22]/10 md:grid-cols-3">
          {[
            [
              ShoppingBag,
              "Sell beautifully",
              "Create and organize products without losing the character of your collection.",
            ],
            [
              PackageCheck,
              "Fulfil clearly",
              "See what needs attention and move orders through every genuine business state.",
            ],
            [
              BarChart3,
              "Know the business",
              "Read revenue, inventory and sales activity from one concise overview.",
            ],
          ].map(([Icon, title, copy], index) => (
            <motion.article
              key={String(title)}
              {...reveal}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-[#F8F7F3] p-7 md:min-h-72 md:p-8"
            >
              <Icon className="h-5 w-5 text-[#6F8294]" />
              <p className="mt-20 font-spaceGrotesk text-xl font-semibold tracking-tight">
                {String(title)}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#566170]">
                {String(copy)}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-[#151A22] px-4 py-20 text-white md:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1420px]">
          <motion.div
            {...reveal}
            className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#AEBCC7]">
                Designed around the work
              </p>
              <h2 className="mt-3 font-spaceGrotesk text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                From drop to delivery.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/55">
              Your collection stays visual. Your operations stay precise.
              Nothing competes with the next thing you need to do.
            </p>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-12">
            <motion.div
              {...reveal}
              className="relative min-h-[520px] overflow-hidden rounded-[1.75rem] md:col-span-7"
            >
              <img
                src={home2}
                alt="Fashion vendor preparing a collection"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-7 pt-24">
                <span className="text-[10px] font-bold uppercase tracking-[.2em] text-white/60">
                  01 / Catalogue
                </span>
                <h3 className="mt-2 font-spaceGrotesk text-3xl font-semibold">
                  Let the product lead.
                </h3>
              </div>
            </motion.div>
            <motion.div
              {...reveal}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative min-h-[520px] overflow-hidden rounded-[1.75rem] md:col-span-5"
            >
              <img
                src={home3}
                alt="Ashobox fashion presentation"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-7 pt-24">
                <span className="text-[10px] font-bold uppercase tracking-[.2em] text-white/60">
                  02 / Operations
                </span>
                <h3 className="mt-2 font-spaceGrotesk text-3xl font-semibold">
                  Run the business calmly.
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 lg:py-32">
        <motion.div
          {...reveal}
          className="mx-auto flex max-w-[1420px] flex-col items-start justify-between gap-10 rounded-[2rem] bg-[#DCE4E8] p-7 md:flex-row md:items-end md:p-12 lg:p-16"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#566170]">
              Ready when you are
            </p>
            <h2 className="mt-4 max-w-3xl font-spaceGrotesk text-4xl font-semibold leading-none tracking-[-.055em] md:text-6xl">
              Bring your next collection to Ashobox.
            </h2>
          </div>
          <Button
            size="lg"
            onClick={() => navigate("/signup")}
            className="shrink-0"
          >
            Create vendor account <ArrowRight size={16} />
          </Button>
        </motion.div>
      </section>

      <footer className="border-t border-[#151A22]/10 px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-[1420px] flex-col justify-between gap-3 text-xs text-[#566170] sm:flex-row">
          <span>© {new Date().getFullYear()} Ashobox</span>
          <span>Vendor studio · Built for fashion commerce</span>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
