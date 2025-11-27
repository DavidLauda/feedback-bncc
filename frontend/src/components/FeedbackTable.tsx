import { Feedback } from "../lib/types/feedback";
import {
  User,
  Mail,
  Calendar,
  Users,
  Star,
  Hourglass,
  CalendarPlus,
  Trash,
  Edit,
} from "lucide-react";

const headers = [
  { text: "Name", icon: <User size={16} /> },
  { text: "Email", icon: <Mail size={16} /> },
  { text: "Event", icon: <Calendar size={16} /> },
  { text: "Division", icon: <Users size={16} /> },
  { text: "Rating", icon: <Star size={16} /> },
  { text: "Status", icon: <Hourglass size={16} /> },
  { text: "Created", icon: <CalendarPlus size={16} /> },
  { text: "Actions", icon: <Trash size={16} /> },
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
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full table-auto">
        <thead className="text-left">
          <tr>
            {headers.map((h) => (
              <th
                key={h.text}
                className="px-3 py-2 font-semibold text-gray-700"
              >
                <span className="hidden sm:inline">{h.text}</span>
                <span className="inline sm:hidden">{h.icon}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((f) => (
            <tr
              key={f.id}
              onClick={() => {
                setIsModalOpen(true);
                setSelectedFeedback(f);
              }}
              className="border-t border-gray-300 transition-all duration-200 hover:bg-gray-50"
            >
              <td className="px-3 py-4">{f.name}</td>
              <td className="px-3 py-4">{f.email}</td>
              <td className="px-3 py-4">{f.eventName}</td>
              <td className="px-3 py-4">{f.division}</td>
              <td className="px-3 py-4">{f.rating}</td>
              <td className="px-3 py-4">{f.status}</td>
              <td className="px-3 py-4">
                {new Date(f.createdAt).toLocaleString().split(",")[0]}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedFeedback(f);
                    }}
                    className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(f.id);
                      e.stopPropagation();
                    }}
                    className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
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
