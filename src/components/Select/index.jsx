import { useFormContext } from "react-hook-form";

export default function Select({
  name = "",
  label = "",
  required = false,
  options = [],
  className = "",
  ...rest
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { ref, ...registerProps } = register(name, { required });

  return (
    <div className={`w-full flex flex-col gap-[4px] ${className}`}>
      <p className="text-sm text-neutral-900 font-medium capitalize">{label}</p>
      <div className="w-full h-[40px] flex items-center bg-neutral-100 rounded-sm px-[12px] relative">
        <select
          className="w-full h-full text-neutral-900 text-sm font-normal bg-neutral-100 outline-none"
          {...registerProps}
          ref={ref}
          {...rest}
        >
          <option value="">Selecione...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {errors[name] && (
        <span className="text-red-500 text-xs font-semibold pl-1">
          {errors[name].message || "Seleção obrigatória"}
        </span>
      )}
    </div>
  );
}
