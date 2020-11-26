
import axios from "axios";
import { SERVER } from "../server/Server";
export const Axios = axios.create({
    baseURL: SERVER
});