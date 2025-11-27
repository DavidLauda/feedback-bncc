export type Division = "LnT" | "EEO" | "PR" | "HRD" | "RnD" | "";

export type Status = "open" | "in-review" | "resolved";

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
  status: Status;
};

export type NewFeedback = Omit<Feedback, "id" | "createdAt" | "status">;
