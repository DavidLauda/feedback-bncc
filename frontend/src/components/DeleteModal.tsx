import { AlertTriangle } from "lucide-react";
import { deleteFeedback } from "../lib/api/feedback";
import { toast } from "sonner";
import { Feedback } from "../lib/types/feedback";

export default function DeleteModal({
  feedback,
  onClose,
  setFeedbacks,
}: {
  feedback: Feedback;
  onClose: () => void;
  setFeedbacks: React.Dispatch<React.SetStateAction<Feedback[]>>;
}) {
  const handleDelete = async () => {
    try {
      await deleteFeedback(feedback.id);
      setFeedbacks((prev) => prev.filter((f) => f.id !== feedback.id));
      toast.success("Feedback deleted");
    } catch (err) {
      console.error("Error deleting feedback:", err);
      toast.error("Failed to delete feedback");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-md flex-col gap-6 rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Delete Feedback</h2>
            <p className="text-sm text-gray-500">
              This action cannot be undone
            </p>
          </div>
        </div>

        <p className="text-gray-700">
          Are you sure you want to delete this feedback?
        </p>

        <div className="flex justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-gray-100 px-5 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              handleDelete();
              onClose();
            }}
            className="cursor-pointer rounded-lg bg-linear-to-tr from-red-500 to-red-600 px-5 py-3 font-medium text-white shadow-lg transition-all hover:from-red-600 hover:to-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
