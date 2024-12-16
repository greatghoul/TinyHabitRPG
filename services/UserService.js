import Habitica from "services/Habitica.js"

class UserService extends Habitica {
  getUser () {
    return this.api().get("/user")
  }

}

export default new UserService()
