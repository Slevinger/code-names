import openSocket from "socket.io-client";
import { PROD_PATH, DEV_PATH } from "../const/config";

export const socket = openSocket(PROD_PATH);
socket.connect();
