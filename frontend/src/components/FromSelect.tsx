export default function FormSelect({
  id,
  label,
  value,
  onChange,
  options,
  isAdmin,
}: {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: (string | number)[];
  isAdmin?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2 text-gray-800"
      >
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${
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
