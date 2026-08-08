import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BrandMobileIcon } from "../../assets/svg/Product";
import fashionImage from "../../assets/home2.jpg";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  backTo?: string;
  compact?: boolean;
}

const AuthShell = ({ eyebrow, title, description, children, backTo = "/", compact = false }: AuthShellProps) => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-[#151A22] p-0 text-[#151A22] lg:p-3">
      <div className="mx-auto grid min-h-screen max-w-[1680px] overflow-hidden bg-[#F8F7F3] lg:min-h-[calc(100vh-1.5rem)] lg:grid-cols-[1.05fr_.95fr] lg:rounded-[2rem]">
        <section className="relative hidden overflow-hidden lg:block">
          <img src={fashionImage} alt="Ashobox fashion vendor" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151A22] via-[#151A22]/20 to-black/15" />
          <button onClick={() => navigate("/")} className="absolute left-10 top-9 z-10 flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 backdrop-blur">
            <BrandMobileIcon className="h-6 w-auto" /><span className="border-l border-[#151A22]/15 pl-3 text-[10px] font-bold uppercase tracking-[.18em]">Vendor studio</span>
          </button>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="absolute inset-x-0 bottom-0 p-10 text-white xl:p-14">
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-white/60">Ashobox for vendors</p>
            <h2 className="mt-4 max-w-2xl font-spaceGrotesk text-5xl font-semibold leading-[.98] tracking-[-.055em] xl:text-6xl">Where your collection meets its audience.</h2>
            <div className="mt-8 flex gap-8 border-t border-white/20 pt-5 text-xs text-white/60"><span>Curate products</span><span>Manage orders</span><span>Track growth</span></div>
          </motion.div>
        </section>
        <section className="relative flex min-h-screen items-center px-5 py-10 sm:px-10 lg:min-h-0 lg:px-14 xl:px-20">
          <button onClick={() => navigate("/")} className="absolute left-5 top-6 flex items-center gap-2 lg:hidden"><BrandMobileIcon className="h-7 w-auto" /></button>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className={`mx-auto w-full ${compact ? "max-w-md" : "max-w-xl"}`}>
            <button onClick={() => navigate(backTo)} className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#566170] transition hover:text-[#151A22]"><ArrowLeft size={15}/> Back</button>
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#6F8294]">{eyebrow}</p>
            <h1 className="mt-3 font-spaceGrotesk text-4xl font-semibold leading-none tracking-[-.05em] md:text-5xl">{title}</h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#566170]">{description}</p>
            <div className="mt-8">{children}</div>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default AuthShell;
