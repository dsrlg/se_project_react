const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`)
  .then((res) => {
    return res.ok ? res.json() : promise.reject("Error:${res.status}");
  });
}

const api = { getItems };

export default api;
