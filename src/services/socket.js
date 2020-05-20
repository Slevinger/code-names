import openSocket from "socket.io-client";
import { url } from "../const/config";

export const socket = openSocket(url);
socket.connect();
