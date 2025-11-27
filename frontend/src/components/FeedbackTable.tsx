import { Edit, Trash } from "lucide-react";
import { Feedback } from "../lib/types/feedback";

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

export default function FeedbackTable({
  feedbacks,
  setIsModalOpen,
  setSelectedFeedback,
  handleDelete,
}: {
  feedbacks: Feedback[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFeedback: React.Dispatch<React.SetStateAction<Feedback | null>>;
  handleDelete: (id: string) => Promise<void>;
}) {
  return (
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
          {feedbacks.map((f) => (
            <tr
              key={f.id}
              className="border-t border-gray-300 hover:bg-gray-50 transition-all duration-200"
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
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedFeedback(f);
                    }}
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
  );
}
