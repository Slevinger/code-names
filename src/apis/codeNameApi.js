import axios from "axios";

// import { AsyncStorage } from "react-native";
import { url } from "../const/config";
const instance = axios.create({
  baseURL: url
});
export default instance;
