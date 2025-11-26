import { useState } from "react";
import Event from "../components/Event";
import Feedback from "../components/Feedback";
import Personal from "../components/Personal";
import { Division } from "../lib/types/feedback";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [division, setDivision] = useState<Division>("");

  const [event, setEvent] = useState("");
  const [rating, setRating] = useState(0);

  const [feedback, setfeedback] = useState("");
  const [suggestion, setSuggestion] = useState("");

  return (
    <div className="flex min-h-screen justify-center p-16 bg-linear-to-tr from-blue-400 to-purple-400">
      <div className="px-20 py-10 w-4xl rounded-lg flex flex-col gap-4 bg-white ">
        <div className="flex gap-1 flex-col items-center">
          <h1 className="text-4xl text-indigo-500 font-bold">Feedback Form</h1>
          <p className="text-lg text-gray-400">
            Help us improve our services. We'd love to hear your feedback!
          </p>
        </div>

        <Personal
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          division={division}
          setDivision={setDivision}
        />
        <hr className="my-4" />
        <Event
          eventName={event}
          setEventName={setEvent}
          rating={rating}
          setRating={setRating}
        />
        <hr className="my-4" />
        <Feedback
          feedback={feedback}
          setFeedback={setfeedback}
          suggestion={suggestion}
          setSuggestion={setSuggestion}
        />

        <button
          type="submit"
          className="my-3 w-full cursor-pointer bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
