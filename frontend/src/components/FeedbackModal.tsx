import { useState } from "react";
import { Feedback } from "../lib/types/feedback";
import { updateFeedback } from "../lib/api/feedback";
import { toast } from "sonner";

export default function FeedbackModal({
  feedback,
  onClose,
}: {
  feedback: Feedback;
  onClose: () => void;
}) {
  const [feedbackData, setFeedbackData] = useState<Feedback>(feedback);

  const handleChange = (key: string, value: string) => {
    setFeedbackData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await updateFeedback(feedbackData.id, feedbackData);
      toast.success("Feedback updated");
      console.log("New feedback data:", data);
      onClose();
    } catch (error) {
      console.error("Error updating feedback:", error);
      toast.error("Failed to update feedback");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Edit Feedback</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-gray-800"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={feedbackData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
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
              id="email"
              type="email"
              value={feedbackData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="event-name"
              className="block text-sm font-medium mb-2 text-gray-800"
            >
              Event Name
            </label>
            <input
              id="event-name"
              type="text"
              value={feedbackData.eventName}
              onChange={(e) => handleChange("eventName", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="division"
              className="block text-sm font-medium mb-2 text-gray-800"
            >
              Division
            </label>
            <input
              id="division"
              type="text"
              value={feedbackData.division}
              onChange={(e) => handleChange("division", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium mb-2 text-gray-800"
            >
              Rating
            </label>
            <select
              id="rating"
              value={feedbackData.rating}
              onChange={(e) => handleChange("rating", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num !== 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium mb-2 text-gray-800"
            >
              Status
            </label>
            <select
              id="status"
              value={feedbackData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            >
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
            </select>
          </div>

          <div>
            <label
              id="comment"
              className="block text-sm font-medium mb-2 text-gray-800"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={feedbackData.comment || ""}
              onChange={(e) => handleChange("comment", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              rows={3}
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
              value={feedbackData.suggestion || ""}
              onChange={(e) => handleChange("suggestion", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className=" bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
