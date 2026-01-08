import { apiFetch } from "./api";

export const loginApi = async ({ email, password }) =>
  apiFetch("/user/login", {
    method: "POST",
    body: { email, password },
  });
