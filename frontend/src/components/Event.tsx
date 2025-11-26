const ratings = [
  { text: "1 - Poor", value: 1 },
  { text: "2 - Fair", value: 2 },
  { text: "3 - Good", value: 3 },
  { text: "4 - Very Good", value: 4 },
  { text: "5 - Excellent", value: 5 },
];

export default function Event({
  eventName,
  rating,
  setEventName,
  setRating,
}: {
  eventName: string;
  rating: number;
  setEventName: (eventName: string) => void;
  setRating: (rating: number) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="event-name"
            className="block text-sm font-medium mb-2 text-gray-800"
          >
            Event Name
          </label>
          <input
            type="text"
            id="event-name"
            name="event-name"
            required
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            placeholder="Enter event name"
          />
        </div>

        <label
          htmlFor="rating"
          className="block text-sm font-medium mb-2 text-gray-800"
        >
          Rating
        </label>
        <div className="flex flex-col gap-5">
          {ratings.map((r) => (
            <label
              key={r.value}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                value={r.value}
                checked={rating === r.value}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-4 h-4"
              />
              <span>{r.text}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
