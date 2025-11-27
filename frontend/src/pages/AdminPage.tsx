import { useEffect, useState, useMemo } from "react";
import { deleteFeedback, getAllFeedback } from "../lib/api/feedback";
import { Feedback } from "../lib/types/feedback";
import { toast } from "sonner";
import FeedbackModal from "../components/FeedbackModal";
import FeedbackTable from "../components/FeedbackTable";

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const filteredFeedback = useMemo(() => {
    const s = debouncedSearch.toLowerCase();
    return feedbacks.filter(
      (f) =>
        f.name.toLowerCase().includes(s) ||
        f.email.toLowerCase().includes(s) ||
        f.eventName.toLowerCase().includes(s)
    );
  }, [debouncedSearch, feedbacks]);

  const handleDelete = async (id: string) => {
    try {
      await deleteFeedback(id);
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      toast.success("Feedback deleted");
    } catch (err) {
      console.error("Error deleting feedback:", err);
      toast.error("Failed to delete feedback");
    }
  };

  const refresh = async () => {
    try {
      const data = await getAllFeedback();
      setFeedbacks(data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="flex min-h-screen justify-center p-16 bg-linear-to-tr from-red-400 to-orange-400">
      <div className="w-5xl p-10 rounded-xl flex flex-col gap-4 bg-white shadow-3xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-orange-500">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and review all feedback submissions
          </p>
        </div>

        <div className="flex flex-row gap-5">
          <input
            type="text"
            placeholder="Search by name, email, or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          <button
            onClick={refresh}
            className="bg-linear-to-r  from-red-500 to-orange-500 cursor-pointer shadow-lg text-white px-5 py-2 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredFeedback.length === 0 ? (
          <p className="text-gray-500">No feedback found.</p>
        ) : (
          <FeedbackTable
            feedbacks={filteredFeedback}
            setIsModalOpen={setIsModalOpen}
            setSelectedFeedback={setSelectedFeedback}
            handleDelete={handleDelete}
          />
        )}
        {isModalOpen && (
          <FeedbackModal
            feedback={selectedFeedback!}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
