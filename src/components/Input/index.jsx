import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import Icon from "../icon";

export default function Input({
  name = "",
  label = "",
  required = false,
  type = "text",
  placeholder = "",
  pattern = null,
  className = "",
  mask = null,
  ...rest
}) {
  const [inputType, setInputType] = useState(type);
  const [displayValue, setDisplayValue] = useState("");
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);

  useEffect(() => {
    if (mask && value) {
      const rawValue = value.replace(/\D/g, "");
      const maskedValue = applyMask(rawValue, mask);
      if (maskedValue !== value) {
        setDisplayValue(maskedValue);
        setValue(name, rawValue);
      }
    }
  }, [value, mask, name, setValue]);

  const applyMask = (value, maskPattern) => {
    if (!value) return "";

    let result = "";
    let valueIndex = 0;

    for (let i = 0; i < maskPattern.length && valueIndex < value.length; i++) {
      if (maskPattern[i] === "#") {
        result += value[valueIndex++];
      } else {
        result += maskPattern[i];
        if (valueIndex < value.length && maskPattern[i + 1] === "#") {
          continue;
        }
      }
    }

    return result;
  };

  const { ref, ...registerProps } = register(name, {
    required,
    ...(pattern && { pattern }),
  });

  return (
    <div className={`w-full flex flex-col gap-[4px] ${className}`}>
      <p className="text-sm text-neutral-900 font-medium capitalize">{label}</p>
      <div className="w-full h-[40px] flex justify-center items-center gap-[8px] bg-neutral-100 rounded-sm px-[12px] relative">
        <input
          className="w-full h-full text-neutral-900 text-sm font-normal"
          {...registerProps}
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          value={mask ? displayValue : undefined}
          onChange={(e) => {
            if (mask) {
              const rawValue = e.target.value.replace(/\D/g, "");
              const maskedValue = applyMask(rawValue, mask);
              setDisplayValue(maskedValue);
              setValue(name, rawValue);
            } else {
              registerProps.onChange(e);
            }
          }}
          {...rest}
        />

        {type === "password" && (
          <button
            onClick={() =>
              setInputType((prev) =>
                prev === "password" ? "text" : "password"
              )
            }
            type="button"
            className="cursor-pointer flex justify-center items-center"
            title={inputType === "password" ? "Show" : "Hide"}
          >
            {inputType === "text" ? (
              <Icon icon="EyeOff" color="black" size={20} />
            ) : (
              <Icon icon="Eye" color="black" size={20} />
            )}
          </button>
        )}
      </div>
      {errors[name] && (
        <span className="text-red-500 text-xs font-semibold pl-1">
          {errors[name].message || "Inválido"}
        </span>
      )}
    </div>
  );
}
