import { apiFetch } from "./api";

export const getProfileApi = async (token) =>
  apiFetch("/user/profile", {
    method: "GET",
    token,
  });

export const updateUsernameApi = async (userName, token) =>
  apiFetch("/user/profile", {
    method: "PUT",
    body: { userName },
    token,
  });
