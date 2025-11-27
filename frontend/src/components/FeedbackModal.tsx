import { useState } from "react";
import { Feedback } from "../lib/types/feedback";
import { updateFeedback } from "../lib/api/feedback";
import { toast } from "sonner";
import FormInput from "./FormInput";
import FormSelect from "./FromSelect";
import FormTextarea from "./FromTextarea";

export default function FeedbackModal({
  feedback,
  onClose,
}: {
  feedback: Feedback;
  onClose: () => void;
}) {
  const [feedbackData, setFeedbackData] = useState<Feedback>(feedback);

  const handleChange = (key: string, value: any) => {
    setFeedbackData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateFeedback(feedbackData.id, feedbackData);
      toast.success("Feedback updated");
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
          <FormInput
            id="name"
            label="Name"
            value={feedbackData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            isAdmin
          />

          <FormInput
            id="email"
            label="Email"
            type="email"
            value={feedbackData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            isAdmin
          />

          <FormInput
            id="event-name"
            label="Event Name"
            value={feedbackData.eventName}
            onChange={(e) => handleChange("eventName", e.target.value)}
            isAdmin
          />

          <FormInput
            id="division"
            label="Division"
            value={feedbackData.division}
            onChange={(e) => handleChange("division", e.target.value)}
            isAdmin
          />

          <FormSelect
            id="rating"
            label="Rating"
            value={feedbackData.rating}
            onChange={(e) => handleChange("rating", Number(e.target.value))}
            options={[1, 2, 3, 4, 5]}
            isAdmin
          />

          <FormSelect
            id="status"
            label="Status"
            value={feedbackData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            options={["Open", "Pending", "Reviewed"]}
            isAdmin
          />

          <FormTextarea
            id="comment"
            label="Comment"
            value={feedbackData.comment || ""}
            onChange={(e) => handleChange("comment", e.target.value)}
            isAdmin
          />

          <FormTextarea
            id="suggestion"
            label="Suggestion"
            value={feedbackData.suggestion || ""}
            onChange={(e) => handleChange("suggestion", e.target.value)}
            isAdmin
          />

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
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
