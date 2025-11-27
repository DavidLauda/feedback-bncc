import { Mail, User, Users } from "lucide-react";
import { Division } from "../lib/types/feedback";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

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
          placeholder="John Doe"
          Icon={User}
          onChange={(e) => onChange("name", e.target.value)}
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          Icon={Mail}
          value={form.email}
          placeholder="johndoe@example.com"
          onChange={(e) => onChange("email", e.target.value)}
        />

        <FormSelect
          id="division"
          label="Division"
          Icon={Users}
          value={form.division}
          options={["LnT", "EEO", "PR", "HRD", "RnD"]}
          onChange={(e) => onChange("division", e.target.value)}
        />
      </div>
    </div>
  );
}
