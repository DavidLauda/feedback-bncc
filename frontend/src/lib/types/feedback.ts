export type Division =
  | "Learning & Training"
  | "External Events & Operations"
  | "Public Relations"
  | "Human Resources Development"
  | "Research & Development"
  | "";

export type Feedback = {
  id: string;
  name: string;
  email: string;
  eventName: string;
  division: Division;
  rating: number;
  comment?: string;
  suggestion?: string;
  createdAt: string;
  status: "open" | "in-review" | "resolved";
};

export type NewFeedback = Omit<Feedback, "id" | "createdAt" | "status">;
