import axios from "axios";

export const API = axios.create({
  baseURL: "https://suitmedia-backend.suitdev.com/api/",
});
