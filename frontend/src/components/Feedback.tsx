export default function Feedback({
  form,
  onChange,
}: {
  form: { comment?: string; suggestion?: string };
  onChange: (field: keyof typeof form, value: any) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium mb-2 text-gray-800"
          >
            Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={form.comment}
            onChange={(e) => onChange("comment", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            placeholder="Share your feedback here..."
          />
        </div>

        <div>
          <label
            htmlFor="suggestion"
            className="block text-sm font-medium mb-2 text-gray-800"
          >
            Suggestion
          </label>
          <textarea
            id="suggestion"
            name="suggestion"
            value={form.suggestion}
            onChange={(e) => onChange("suggestion", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            placeholder="Share your suggestion here..."
          />
        </div>
      </div>
    </div>
  );
}
