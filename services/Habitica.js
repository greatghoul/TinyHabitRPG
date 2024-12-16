import axios from "axios"
import Cookies from "js-cookie"

const baseURL = "https://habitica.com/api/v3"

class Habitica {
  auth () {
    const { user, key } = Cookies.get()
    if (user && key) {
      return { user, key }
    }
  }

  api () {
    const headers = {}
    const auth = this.auth()
    if (auth) {
      headers["x-api-user"] = auth.user
      headers["x-api-key"] = auth.key
    }

    const instance = axios.create({ baseURL, headers })
    const resHandler = res => res.data.data
    const errHandler = err => Promise.reject(err)
    instance.interceptors.response.use(resHandler, errHandler)
    return instance
  }

  randomToken (prefix) {
    const time = Date.now()
    const tail = Math.random().toString(36).substring(2, 8)
    return `${prefix}-${time}-${tail}`
  }
}

export default Habitica
