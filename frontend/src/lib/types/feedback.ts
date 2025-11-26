export type Division = "LnT" | "EEO" | "PR" | "HRD" | "RnD" | "";

export type Feedback = {
  id: string;
  name: string;
  email: string;
  eventName: string;
  division: Division;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  suggestion?: string;
  createdAt: string;
  status: "open" | "in-review" | "resolved";
};
