import React from "react";

export default function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  Icon,
  isAdmin,
}: {
  id: string;
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: React.ElementType;
  isAdmin?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex gap-1 items-center text-sm font-medium mb-2 text-gray-800"
      >
        {Icon && <Icon size={16} />}
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${
          isAdmin ? "focus:ring-orange-500" : "focus:ring-indigo-500"
        }`}
      />
    </div>
  );
}
