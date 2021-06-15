import axios from "axios";
import showMessage from "../utils/showMessage";

const instance = axios.create();

const ERROR_STATUS = 0;

// instance.interceptors.request.use(req => {
//   return req
// })

instance.interceptors.response.use(resp => {
  if (resp.data.code !== ERROR_STATUS) {
    showMessage({
      content: resp.data.msg,
      type: "error",
      duration: 1500,
    });
    return null
  }
  return resp.data.data
})

export default instance