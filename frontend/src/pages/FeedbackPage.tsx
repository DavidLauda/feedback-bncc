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

    try {
      await createFeedback({
        name,
        email,
        eventName,
        division,
        rating,
        comment,
        suggestion,
      });

      toast.success("Feedback berhasil dikirim!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Feedback gagal dikirim!");
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-linear-to-tr from-blue-400 to-purple-400 p-4 sm:p-8 lg:p-16">
      <div className="shadow-3xl flex w-full max-w-3xl flex-col gap-4 rounded-3xl bg-white px-6 py-8 sm:px-12 lg:px-20 lg:py-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-indigo-500 sm:text-3xl lg:text-4xl">
            Feedback Form
          </h1>
          <p className="mt-1 text-sm text-gray-400 sm:text-base lg:text-lg">
            Help us improve our services. We'd love to hear your feedback!
          </p>
        </div>

        <form>
          <Personal form={form} onChange={handleChange} />
          <hr className="my-6" />

          <Event form={form} onChange={handleChange} />
          <hr className="my-6" />

          <Feedback form={form} onChange={handleChange} />

          <button
            type="button"
            onClick={handleSubmit}
            className="my-10 w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
