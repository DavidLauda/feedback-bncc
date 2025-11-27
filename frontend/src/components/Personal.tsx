import { Division } from "../lib/types/feedback";
import FormInput from "./FormInput";
import FormSelect from "./FromSelect";

export default function Personal({
  form,
  onChange,
}: {
  form: { name: string; email: string; division: Division };
  onChange: (field: keyof typeof form, value: any) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="space-y-4">
        <FormInput
          id="=name"
          label="Name"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          isAdmin
        />

        <FormSelect
          id="division"
          label="Division"
          value={form.division}
          onChange={(e) => onChange("division", e.target.value)}
          options={["LnT", "EEO", "PR", "HRD", "RnD"]}
        />
      </div>
    </div>
  );
}
