import { Lightbulb, MessageSquare } from "lucide-react";
import FormTextarea from "./FormTextarea";

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
        <FormTextarea
          id="comment"
          label="Comment"
          value={form.comment || ""}
          placeholder="My Comment"
          Icon={MessageSquare}
          onChange={(e) => onChange("comment", e.target.value)}
        />

        <FormTextarea
          id="suggestion"
          label="Suggestion"
          value={form.suggestion || ""}
          placeholder="My Suggestion"
          Icon={Lightbulb}
          onChange={(e) => onChange("suggestion", e.target.value)}
        />
      </div>
    </div>
  );
}
