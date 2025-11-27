import FormInput from "./FormInput";

const ratings = [
  { text: "1 - Poor", value: 1 },
  { text: "2 - Fair", value: 2 },
  { text: "3 - Good", value: 3 },
  { text: "4 - Very Good", value: 4 },
  { text: "5 - Excellent", value: 5 },
];

export default function Event({
  form,
  onChange,
}: {
  form: { eventName: string; rating: number };
  onChange: (field: keyof typeof form, value: any) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="space-y-4">
        <FormInput
          id="event-name"
          label="Event Name"
          value={form.eventName}
          onChange={(e) => onChange("eventName", e.target.value)}
        />

        <label
          htmlFor="rating"
          className="block text-sm font-medium mb-2 text-gray-800"
        >
          Rating
        </label>
        <div className="flex flex-col gap-5">
          {ratings.map((r) => (
            <label
              key={r.value}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                value={r.value}
                checked={form.rating === r.value}
                onChange={() => onChange("rating", r.value)}
                className="w-4 h-4"
              />
              <span>{r.text}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
