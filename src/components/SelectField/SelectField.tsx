import cn from "@/utils/cn";
import { ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type TSelectProps = {
  name: string;
  label?: ReactNode;
  className?: string;
  outerStyle?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  options: { label: string; value: string }[];
  required?: boolean;
};

const SelectField = ({
  name,
  label,
  register,
  errors,
  options,
  className,
  outerStyle,
  required = true,
}: TSelectProps) => {
  return (
    <div className={cn("", outerStyle)}>
      {label && (
        <div className="capitalize font-inter mb-1">
          {label} {!required && " (Optional)"}
        </div>
      )}

      <select
        className={cn(
          "px-3 py-3 rounded-lg border-0 bg-primary outline-0 text-md w-full",
          className
        )}
        {...register(name, { required: required ? "This field is required" : false })}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {errors[name] && (
        <p className="text-red-500 font-bold capitalize mt-2 text-sm">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default SelectField;
