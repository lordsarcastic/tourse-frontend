import axios from "axios";
import { BASE_URL } from "./routes";

export const client = axios.create({
    baseURL: BASE_URL,
});
