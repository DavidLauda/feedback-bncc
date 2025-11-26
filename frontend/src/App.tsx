import { useState } from "react";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  const [page, setPage] = useState<"feedback" | "admin">("feedback");

  return <div className="App">{page === "feedback" && <FeedbackPage />}</div>;
}

export default App;
