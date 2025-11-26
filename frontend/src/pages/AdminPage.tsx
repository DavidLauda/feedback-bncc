import { useEffect, useState, useMemo } from "react";
import { deleteFeedback, getAllFeedback } from "../lib/api/feedback";
import { Feedback } from "../lib/types/feedback";
import { toast } from "sonner";
import { Edit, Trash } from "lucide-react";

const headers = [
  "Name",
  "Email",
  "Event Name",
  "Division",
  "Rating",
  "Status",
  "Created At",
  "Actions",
];

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const filteredFeedback = useMemo(() => {
    const s = debouncedSearch.toLowerCase();
    return feedback.filter(
      (f) =>
        f.name.toLowerCase().includes(s) ||
        f.email.toLowerCase().includes(s) ||
        f.eventName.toLowerCase().includes(s)
    );
  }, [debouncedSearch, feedback]);

  const handleDelete = async (id: string) => {
    try {
      await deleteFeedback(id);
      setFeedback((prev) => prev.filter((f) => f.id !== id));
      toast.success("Feedback deleted");
    } catch (err) {
      console.error("Error deleting feedback:", err);
      toast.error("Failed to delete feedback");
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllFeedback();
        setFeedback(data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex min-h-screen justify-center p-16 bg-linear-to-tr from-red-400 to-orange-400">
      <div className="w-5xl p-10 rounded-xl flex flex-col gap-4 bg-white shadow-xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage and review all feedback submissions
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search by name, email, or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredFeedback.length === 0 ? (
          <p className="text-gray-500">No feedback found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg ">
            <table className="w-full table-auto">
              <thead className=" text-left">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-3 py-4 font-semibold text-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredFeedback.map((f) => (
                  <tr
                    key={f.id}
                    className="border-t hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-3 py-4">{f.name}</td>
                    <td className="px-3 py-4">{f.email}</td>
                    <td className="px-3 py-4">{f.eventName}</td>
                    <td className="px-3 py-4">{f.division}</td>
                    <td className="px-3 py-4">{f.rating}</td>
                    <td className="px-3 py-4">{f.status}</td>
                    <td className="px-3 py-4">
                      {new Date(f.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert("Edit functionality")}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(f.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
