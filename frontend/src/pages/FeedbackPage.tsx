import { useState } from "react";
import Event from "../components/Event";
import Feedback from "../components/Feedback";
import Personal from "../components/Personal";
import { Division, NewFeedback } from "../lib/types/feedback";
import { createFeedback } from "../lib/api/feedback";
import { toast } from "sonner";

export default function FeedbackPage() {
  const [form, setForm] = useState<NewFeedback>({
    name: "",
    email: "",
    division: "LnT" as Division,
    eventName: "",
    rating: 0,
    comment: "",
    suggestion: "",
  });

  const handleChange = (field: keyof typeof form, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, email, eventName, division, rating, comment, suggestion } =
      form;

    if (!name || !email || !eventName || !division || !rating) {
      toast.error("Field wajib harus diisi!");
      return;
    }

    const data = {
      name,
      email,
      eventName,
      division,
      rating,
      comment,
      suggestion,
    };

    try {
      const result = await createFeedback(data);
      console.log("Success:", result);
      toast.success("Feedback berhasil dikirim!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Feedback gagal dikirim!");
    }
  };

  return (
    <div className="flex min-h-screen justify-center p-16 bg-linear-to-tr from-blue-400 to-purple-400">
      <div className="px-20 py-10 w-4xl rounded-3xl flex flex-col gap-4 bg-white shadow-3xl ">
        <div className="flex gap-1 flex-col items-center">
          <h1 className="text-4xl text-indigo-500 font-bold">Feedback Form</h1>
          <p className="text-lg text-gray-400">
            Help us improve our services. We'd love to hear your feedback!
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Personal form={form} onChange={handleChange} />
          <hr className="my-6" />
          <Event form={form} onChange={handleChange} />
          <hr className="my-6" />
          <Feedback form={form} onChange={handleChange} />

          <button
            type="submit"
            className="my-3 w-full cursor-pointer bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
