export default function FormSelect({
  id,
  label,
  value,
  onChange,
  Icon,
  options,
  isAdmin,
}: {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  Icon?: React.ElementType;
  options: (string | number)[];
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

      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 ${
          isAdmin ? "focus:ring-orange-500" : "focus:ring-indigo-500"
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
