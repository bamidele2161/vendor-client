import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search, X } from "@icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  onChange: (selectedValues: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // <-- new
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: string) => {
    const alreadySelected = selectedValues.includes(option);
    const updatedValues = alreadySelected
      ? selectedValues.filter((val) => val !== option)
      : [...selectedValues, option];

    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };

  const handleRemoveValue = (valueToRemove: string) => {
    const updatedValues = selectedValues.filter((val) => val !== valueToRemove);
    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options?.filter((option) =>
    option?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid gap-2" ref={dropdownRef}>
      <Label>
        {label} <span className="text-base text-red-500">*</span>
      </Label>

      <div className="relative">
        <div role="button" tabIndex={0}
          className="flex min-h-12 w-full cursor-pointer flex-wrap items-center gap-2 rounded-xl border border-[#151A22]/10 bg-white px-4 py-2 text-left text-sm shadow-sm transition focus-visible:border-[#6F8294] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6F8294]/10"
          onClick={toggleDropdown}
        >
          {selectedValues.length === 0 ? (
            <span className="text-[#6F8294]">Select options...</span>
          ) : (
            selectedValues.map((value, index) => (
              <span
                key={index}
                className="flex items-center rounded-full bg-[#DCE4E8] px-2.5 py-1 text-xs font-semibold"
              >
                {value}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveValue(value);
                  }}
                  type="button" aria-label={`Remove ${value}`} className="ml-1.5 rounded-full text-[#566170] hover:text-red-600"
                >
                  <X size={12}/>
                </button>
              </span>
            ))
          )}<ChevronDown size={16} className={`ml-auto text-[#6F8294] transition ${isOpen ? "rotate-180" : ""}`}/>
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#151A22]/10 bg-white p-1.5 shadow-[0_20px_55px_rgba(21,26,34,.14)]">
            <div className="relative mb-1.5"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F8294]"/>
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="h-10 pl-9"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Options */}
            <div className="max-h-40 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg p-2.5 text-sm hover:bg-[#EEF1F3] ${
                      selectedValues.includes(option) ? "bg-[#EEF1F3]" : ""
                    }`}
                  >
                    <span>{option}</span>
                    {selectedValues.includes(option) && (
                      <Check size={14}/>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-400">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
