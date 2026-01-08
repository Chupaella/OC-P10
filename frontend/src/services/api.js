const BASE_URL = "http://localhost:3001/api/v1";

export const apiFetch = async (path, options = {}) => {
  const { token, headers, body, ...rest } = options;
  const requestHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const fetchOptions = {
    ...rest,
    headers: requestHeaders,
  };

  if (body !== undefined) {
    fetchOptions.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, fetchOptions);
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};
