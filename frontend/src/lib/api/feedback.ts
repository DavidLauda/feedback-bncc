import { Feedback, NewFeedback } from "../types/feedback";

const API_URL = "http://localhost:3000/api";

export const getAllFeedback = async () => {
  const response = await fetch(`${API_URL}/feedback`);
  return response.json();
};

export const createFeedback = async (newFeedback: NewFeedback) => {
  console.log(newFeedback);

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
  updates: Partial<Feedback>
) => {
  const response = await fetch(`${API_URL}/feedback/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteFeedback = async (id: string) => {
  const response = await fetch(`${API_URL}/feedback/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
