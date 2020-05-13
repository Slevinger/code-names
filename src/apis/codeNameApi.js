import axios from "axios";

// import { AsyncStorage } from "react-native";
import { DEV_PATH, PROD_PATH } from "../const/config";
const instance = axios.create({
  baseURL: PROD_PATH
});
export default instance;
