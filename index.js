import Auth from "./Auth.js"
import Main from "./Main.js"
import UserService from "services/UserService.js"

new Ractive({
  components: { Auth, Main },
  el: "main",
  data: {
    user: null,
  },
  template: `
    {{#if user}}
      <Main />
    {{else}}
      <Auth on-login="@this.loadUser()" />
    {{/if}}
  `,
  oninit: function() {
    this.loadUser()
  },
  loadUser () {
    if (UserService.auth()) {
      UserService.getUser().then(user => this.set({ user }))
    }
  }
})
