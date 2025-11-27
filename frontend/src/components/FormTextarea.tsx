export default function FormTextarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  Icon,
  isAdmin,
}: {
  id: string;
  label: string;
  value: string;
  Icon?: React.ElementType;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
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

      <textarea
        id={id}
        value={value}
        rows={rows}
        placeholder={placeholder || ""}
        onChange={onChange}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 ${
          isAdmin ? "focus:ring-orange-500" : "focus:ring-indigo-500"
        }`}
      />
    </div>
  );
}
