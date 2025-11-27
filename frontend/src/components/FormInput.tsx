import React from "react";

export default function FormInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  Icon,
  isAdmin,
}: {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  Icon?: React.ElementType;
  isAdmin?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-800"
      >
        {Icon && <Icon size={16} />}
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ""}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 ${
          isAdmin ? "focus:ring-orange-500" : "focus:ring-indigo-500"
        }`}
      />
    </div>
  );
}
