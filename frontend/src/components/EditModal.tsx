import { useState } from "react";
import { Feedback } from "../lib/types/feedback";
import { updateFeedback } from "../lib/api/feedback";
import { toast } from "sonner";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import {
  Calendar,
  Hourglass,
  Lightbulb,
  Mail,
  MessageSquare,
  Pencil,
  Star,
  User,
  Users,
} from "lucide-react";

export default function EditModal({
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white shadow-2xl [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center gap-2 border-b border-gray-200 p-6 text-gray-800">
          <Pencil size={24} />
          <h2 className="text-2xl font-bold">Edit Feedback</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
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
            options={["open", "in-review", "resolved"]}
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
            Icon={Lightbulb}
            value={feedbackData.suggestion || ""}
            onChange={(e) => handleChange("suggestion", e.target.value)}
            isAdmin
          />

          <div className="flex justify-between text-sm">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg bg-gray-100 px-5 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-linear-to-r from-red-500 to-orange-500 px-5 py-2 font-medium text-white shadow-lg transition-all hover:from-red-600 hover:to-orange-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
