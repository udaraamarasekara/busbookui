import axios from "axios";

const api = axios.create({
  baseURL: "https://busbookapi-2ce7fa2cd5fe.herokuapp.com/api", // Replace with your API base URL
});

export default api;
