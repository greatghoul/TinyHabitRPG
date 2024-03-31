import axios from "axios";

const baseURL = "https://habitica.com/api/v3";

class Habitica {
  api() {
    const user = this.getUser();
    const headers = {};
    if (user) {
      headers["x-api-user"] = user.id;
      headers["x-api-key"] = user.apiToken;
    }

    const instance = axios.create({ baseURL, headers });
    const resHandler = res => res.data.data;
    const errHandler = err => Promise.reject(err);
    instance.interceptors.response.use(resHandler, errHandler);
    return instance;
  }

  getUser() {
    const user = localStorage["user"];
    if (user) {
      return JSON.parse(user);
    }
  }
}

export default Habitica;