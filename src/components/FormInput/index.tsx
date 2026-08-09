import { useState } from "react";
import { Eye, EyeOff } from "@icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { type IFormInputProps } from "../../interfaces/Global";
import Select from "../Select/Select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import "./style.css";

const FormInput = ({ className = "", label, type, id, name, onChange, onBlur, shortP, icon, placeholder, required, disabled, defaultValue, error, selectOptions, keyPropertyName, itemPropertyName, valuePropertyName, searchFunc, onlyCountries, defaultCountry, telValue }: IFormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const describedBy = error ? `${id}-error` : shortP ? `${id}-hint` : undefined;
  const fieldName = name || id;
  const commonProps = { id, name: fieldName, onChange, onBlur, placeholder, disabled, defaultValue, required, "aria-invalid": Boolean(error) as boolean, "aria-describedby": describedBy };

  return (
    <div className={`grid gap-2 ${className}`}>
      {label && <Label htmlFor={id}>{label}{required && <span className="ml-1 text-red-600" aria-hidden="true">*</span>}</Label>}
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#6F8294]">{icon}</span>}
        {type === "cSelect" || type === "select" ? (
          <Select id={id} options={selectOptions} selectedOption={defaultValue} setSelectedOption={(option) => onChange?.({ target: { name: fieldName, value: option } })} errors={error} placeholder={placeholder} searchFunc={searchFunc} keyPropertyName={keyPropertyName} itemPropertyName={itemPropertyName} valuePropertyName={valuePropertyName}/>
        ) : type === "textarea" ? (
          <Textarea {...commonProps} rows={3} className={icon ? "pl-11" : ""}/>
        ) : type === "tel" ? (
          <PhoneInput country={defaultCountry || "ng"} value={telValue ?? String(defaultValue ?? "")} onChange={(value) => onChange?.({ target: { name: fieldName, value } })} inputProps={{ id, name: fieldName, required, "aria-invalid": Boolean(error), "aria-describedby": describedBy }} containerClass={`shadcn-phone ${error ? "shadcn-phone-error" : ""}`} inputClass="shadcn-phone-input" buttonClass="shadcn-phone-button" onBlur={onBlur} onlyCountries={onlyCountries} disabled={disabled}/>
        ) : type === "password" ? (
          <><Input {...commonProps} type={showPassword ? "text" : "password"} className="pr-12"/><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((shown) => !shown)} className="absolute right-1.5 top-1.5 inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#6F8294] transition hover:bg-[#EEF1F3] hover:text-[#151A22]">{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></>
        ) : (
          <Input {...commonProps} type={type || "text"} className={icon ? "pl-11" : ""}/>
        )}
      </div>
      {error && <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-600">{error}</p>}
      {!error && shortP && <p id={`${id}-hint`} className="text-xs leading-5 text-[#6F8294]">{shortP}</p>}
    </div>
  );
};

export default FormInput;
