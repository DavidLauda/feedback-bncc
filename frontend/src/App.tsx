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
        className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-500"
      >
        {page === "feedback" ? <Shield /> : <User />}
      </button>
      {page === "feedback" ? <FeedbackPage /> : <AdminPage />}
    </div>
  );
}

export default App;
