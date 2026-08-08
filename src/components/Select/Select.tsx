import { type FC, useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Input } from "../ui/input";

type SelectOption = string | number | Record<string, unknown>;
interface SelectProps {
  id: string;
  options?: SelectOption[];
  selectedOption?: string | number;
  setSelectedOption: (option: string) => void;
  errors?: unknown;
  keyPropertyName?: string | number;
  itemPropertyName?: string | number;
  valuePropertyName?: string | number;
  placeholder?: string;
  searchFunc?: boolean;
}

const readOption = (option: SelectOption, property?: string | number) => {
  if (typeof option !== "object" || option === null || property === undefined) return option;
  return option[String(property)];
};

const Select: FC<SelectProps> = ({ id, options = [], selectedOption, setSelectedOption, keyPropertyName, placeholder, itemPropertyName, valuePropertyName, searchFunc, errors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => { if (popupRef.current && !popupRef.current.contains(event.target as Node)) setIsOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const selected = options.find((item) => String(readOption(item, valuePropertyName)) === String(selectedOption));
  const selectedLabel = selected ? readOption(selected, itemPropertyName) : selectedOption;
  const filtered = options.filter((option) => String(readOption(option, itemPropertyName)).toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div id={id} className="relative" ref={popupRef}>
      <button type="button" aria-haspopup="listbox" aria-expanded={isOpen} aria-invalid={Boolean(errors)} onClick={() => setIsOpen((open) => !open)} className="flex h-12 w-full items-center justify-between rounded-xl border border-[#151A22]/10 bg-white px-4 text-left text-sm text-[#151A22] shadow-sm shadow-[#151A22]/[0.02] transition focus-visible:border-[#6F8294] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6F8294]/10 aria-[invalid=true]:border-red-500">
        <span className={selectedLabel ? "" : "text-[#6F8294]"}>{selectedLabel ? String(selectedLabel) : placeholder}</span><ChevronDown size={16} className={`text-[#6F8294] transition ${isOpen ? "rotate-180" : ""}`}/>
      </button>
      {isOpen && <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#151A22]/10 bg-white p-1.5 shadow-[0_20px_55px_rgba(21,26,34,.14)]">
        {searchFunc && <div className="relative mb-1.5"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8294]"/><Input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search..." className="h-10 pl-9"/></div>}
        <div role="listbox" aria-label={placeholder} className="max-h-64 overflow-y-auto">
          {filtered.length ? filtered.map((option, index) => {
            const value = readOption(option, valuePropertyName) ?? option;
            const label = readOption(option, itemPropertyName) ?? option;
            const key = readOption(option, keyPropertyName) ?? `${String(value)}-${index}`;
            const active = String(value) === String(selectedOption);
            return <button type="button" role="option" aria-selected={active} key={String(key)} onClick={() => { setSelectedOption(String(value)); setIsOpen(false); }} className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-[#EEF1F3] focus:bg-[#EEF1F3] focus:outline-none"><span>{String(label)}</span>{active && <Check size={15}/>}</button>;
          }) : <p className="px-3 py-6 text-center text-sm text-[#6F8294]">No options found</p>}
        </div>
      </div>}
    </div>
  );
};
export default Select;
