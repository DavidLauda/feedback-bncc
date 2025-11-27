import { Feedback, NewFeedback } from "../types/feedback";

const API_URL = "http://localhost:3000/api";

export const getAllFeedback = async () => {
  const response = await fetch(`${API_URL}/feedback`);
  const json = await response.json();
  return json.data;
};

export const createFeedback = async (newFeedback: NewFeedback) => {
  const response = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFeedback),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create feedback");
  }

  return data;
};

export const updateFeedback = async (
  id: string,
  updates: Partial<Feedback>,
) => {
  const url = `${API_URL}/feedback/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error((await response.text()) || "Failed to update feedback");
  }

  return response.json();
};

export const deleteFeedback = async (id: string) => {
  const url = `${API_URL}/feedback/${id}`;
  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) {
    throw new Error((await response.text()) || "Failed to delete feedback");
  }
  return response.json();
};
