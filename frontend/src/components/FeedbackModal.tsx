import { useState } from "react";
import { Feedback } from "../lib/types/feedback";
import { updateFeedback } from "../lib/api/feedback";
import { toast } from "sonner";
import FormInput from "./FormInput";
import FormSelect from "./FromSelect";
import FormTextarea from "./FromTextarea";
import {
  Calendar,
  Hourglass,
  Mail,
  MessageSquare,
  MessageSquareText,
  Star,
  User,
  Users,
} from "lucide-react";

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
        className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Edit Feedback</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <FormInput
            id="name"
            label="Name"
            Icon={User}
            value={feedbackData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            isAdmin
          />

          <FormInput
            id="email"
            label="Email"
            type="email"
            Icon={Mail}
            value={feedbackData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            isAdmin
          />

          <FormInput
            id="event-name"
            label="Event Name"
            Icon={Calendar}
            value={feedbackData.eventName}
            onChange={(e) => handleChange("eventName", e.target.value)}
            isAdmin
          />

          <FormSelect
            id="division"
            label="Division"
            Icon={Users}
            value={feedbackData.division}
            onChange={(e) => handleChange("division", e.target.value)}
            options={["LnT", "EEO", "PR", "HRD", "RnD"]}
            isAdmin
          />

          <FormSelect
            id="rating"
            label="Rating"
            Icon={Star}
            value={feedbackData.rating}
            onChange={(e) => handleChange("rating", Number(e.target.value))}
            options={[1, 2, 3, 4, 5]}
            isAdmin
          />

          <FormSelect
            id="status"
            label="Status"
            Icon={Hourglass}
            value={feedbackData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            options={["Open", "Pending", "Reviewed"]}
            isAdmin
          />

          <FormTextarea
            id="comment"
            label="Comment"
            Icon={MessageSquare}
            value={feedbackData.comment || ""}
            onChange={(e) => handleChange("comment", e.target.value)}
            isAdmin
          />

          <FormTextarea
            id="suggestion"
            label="Suggestion"
            Icon={MessageSquareText}
            value={feedbackData.suggestion || ""}
            onChange={(e) => handleChange("suggestion", e.target.value)}
            isAdmin
          />

          <div className="flex justify-between ">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-medium cursor-pointer hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-linear-to-r cursor-pointer from-red-500 to-orange-500 shadow-lg text-white px-5 py-2 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
