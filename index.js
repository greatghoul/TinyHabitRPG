import Auth from "./Auth.js"
import Main from "./Main.js"
import UserService from "services/UserService.js"

new Ractive({
  components: { Auth, Main },
  el: "main",
  data: {
    auth: null,
    user: null,
  },
  template: `
    {{#if auth}}
      <Main />
    {{else}}
      <Auth on-login="@this.loadUser()" />
    {{/if}}
  `,
  oninit: function() {
    this.loadUser()
  },
  loadUser () {
    const auth = UserService.auth()
    this.set({ auth })

    UserService.getUser(user => this.set({ user }))
  }
})
