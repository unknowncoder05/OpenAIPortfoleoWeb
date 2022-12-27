const apiUrl = "http://localhost:8000";

const sendRequest = async (url, data, method = "POST") => {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  return response.json();
};

export const startGame = async () => {
  const url = `${apiUrl}/start/`;
  const response = await sendRequest(url, {});
  return response;
};

export const action = async (prompt) => {
  const url = `${apiUrl}/action/`;
  const data = { prompt };
  const response = await sendRequest(url, data);
  return response;
};

export const critic = async (prompt) => {
  const url = `${apiUrl}/critic/`;
  const data = { prompt };
  const response = await sendRequest(url, data);
  return response;
};
