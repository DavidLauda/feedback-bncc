export default function FormTextarea({
  id,
  label,
  value,
  onChange,
  rows = 3,
  Icon,
  isAdmin,
}: {
  id: string;
  label: string;
  value: string;
  Icon?: React.ElementType;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  isAdmin?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-sm font-medium mb-2 text-gray-800"
      >
        {Icon && <Icon size={16} />}
        {label}
      </label>

      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${
          isAdmin ? "focus:ring-orange-500" : "focus:ring-indigo-500"
        }`}
      />
    </div>
  );
}
