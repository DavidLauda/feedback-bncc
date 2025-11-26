import { Division } from "../lib/types/feedback";

export default function Personal({
  name,
  email,
  division,
  setName,
  setEmail,
  setDivision,
}: {
  name: string;
  email: string;
  division: Division;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setDivision: (division: Division) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 text-gray-800"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="division"
            className="block text-sm font-medium mb-2 text-gray-800"
          >
            Division
          </label>
          <select
            id="division"
            name="division"
            value={division}
            onChange={(e) => setDivision(e.target.value as Division)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          >
            <option value="LnT">Learning & Training</option>
            <option value="EEO">External Events & Operations</option>
            <option value="PR">Public Relations</option>
            <option value="HRD">Human Resources Development</option>
            <option value="RnD">Research & Development</option>
          </select>
        </div>
      </div>
    </div>
  );
}
