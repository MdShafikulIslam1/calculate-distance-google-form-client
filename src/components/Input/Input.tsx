import cn from "@/utils/cn";
import { ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: ReactNode;
  className?: string;
  outerStyle?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  type?: "text" | "password" | "email" | "textArea" | string;
  required?: boolean
};

const Input = ({
  name,
  label,
  register,
  errors,
  className,
  outerStyle,
  type = "text",
  required=true,
  ...rest
}: TInputProps) => {
  return (
    <div className={cn("", outerStyle)}>
      {label && <div className="capitalize font-inter mb-1">{label}{!required && " (Optional)"}</div>}

      {type === "textArea" ? (
        <textarea
          className={cn(
            "px-3 py-2 rounded-lg  border-0 bg-primary outline-0 text-md w-full",
            className
          )}
          {...(register(name) as ReturnType<typeof register>)}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          rows={3}
        ></textarea>
      ) : (
        <input
          className={cn(
            "px-3 py-2 rounded-lg text-black outline-0 border-0 text-md w-full",
            className
          )}
          {...register(name)}
          {...rest}
        />
      )}

      {errors[name] && (
        <p className="text-red-500 font-bold capitalize mt-2 text-sm">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default Input;
