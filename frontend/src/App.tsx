import { useState } from "react";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import FeedbackPage from "./pages/FeedbackPage";
import { Shield, User } from "lucide-react";

function App() {
  const [page, setPage] = useState<"feedback" | "admin">("feedback");

  const handleSwitch = () =>
    setPage(page === "feedback" ? "admin" : "feedback");

  return (
    <div>
      <button
        onClick={handleSwitch}
        className="absolute text-indigo-500 flex items-center justify-center right-4 top-4 rounded-full bg-white w-12 h-12"
      >
        {page === "feedback" ? <Shield /> : <User />}
      </button>
      {page === "feedback" ? <FeedbackPage /> : <AdminPage />}
    </div>
  );
}

export default App;
