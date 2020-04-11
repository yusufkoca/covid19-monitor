import axios from "axios";
export default function getClientGeo() {
  return axios.post("https://ipapi.co/json/");
}
