import { useEffect, useState, useMemo } from "react";
import { getAllFeedback } from "../lib/api/feedback";
import { Feedback } from "../lib/types/feedback";
import EditModal from "../components/EditModal";
import FeedbackTable from "../components/FeedbackTable";
import DeleteModal from "../components/DeleteModal";

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
        f.eventName.toLowerCase().includes(s),
    );
  }, [debouncedSearch, feedbacks]);

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
    <div className="flex min-h-screen justify-center bg-linear-to-tr from-red-400 to-orange-400 p-4 sm:p-8">
      <div className="shadow-3xl flex w-full max-w-5xl flex-col gap-6 rounded-xl bg-white p-6 sm:p-10">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-orange-500 sm:text-4xl">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Manage and review all feedback submissions
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-5">
          <input
            type="text"
            placeholder="Search by name, email, or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={refresh}
            className="w-full rounded-lg bg-linear-to-r from-red-500 to-orange-500 px-5 py-2 font-medium text-white shadow-lg transition-all hover:from-red-600 hover:to-orange-600 sm:w-auto"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredFeedback.length === 0 ? (
          <p className="text-center text-gray-500">No feedback found.</p>
        ) : (
          <FeedbackTable
            feedbacks={filteredFeedback}
            setIsEditModalOpen={setIsEditModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setSelectedFeedback={setSelectedFeedback}
          />
        )}

        {isEditModalOpen && (
          <EditModal
            feedback={selectedFeedback!}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            feedback={selectedFeedback!}
            onClose={() => setIsDeleteModalOpen(false)}
            setFeedbacks={setFeedbacks}
          />
        )}
      </div>
    </div>
  );
}
