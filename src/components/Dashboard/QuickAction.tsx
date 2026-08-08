import { Plus, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickAction = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-[#151A22]/[0.07] bg-[#F8F7F3]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Add Product Card */}
        <div className="flex flex-col p-6 md:p-8">
          <span className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6F8294]">Catalogue</span>
          <h3 className="font-spaceGrotesk text-xl font-semibold tracking-tight text-[#151A22]">
            Add a New Product
          </h3>
          <p className="mb-6 mt-2 max-w-md text-sm leading-6 text-[#566170]">
            Add imagery, variants, pricing and stock to publish a new item.
          </p>
          <button
            onClick={() => navigate("/product-management/add-product")}
            className="mt-auto flex h-11 items-center justify-center gap-2 self-start rounded-full bg-[#151A22] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

        {/* View Orders Card */}
        <div className="flex flex-col border-t border-[#151A22]/[0.07] bg-[#DCE4E8] p-6 md:border-l md:border-t-0 md:p-8">
          <span className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#566170]">Fulfilment</span>
          <h3 className="font-spaceGrotesk text-xl font-semibold tracking-tight text-[#151A22]">
            View Orders
          </h3>
          <p className="mb-6 mt-2 max-w-md text-sm leading-6 text-[#566170]">
            Review new orders, update their status and keep delivery moving.
          </p>
          <button
            onClick={() => navigate("/order-management")}
            className="mt-auto flex h-11 items-center justify-center gap-2 self-start rounded-full border border-[#151A22]/10 bg-white/50 px-5 text-sm font-semibold text-[#151A22] transition hover:bg-white"
          >
            View Orders <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAction;
