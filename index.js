import Auth from "./Auth.js";
import Main from "./Main.js";

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
    this.loadUser();
  },
  loadUser () {
    const user = window.localStorage["user"];
    this.set({ user });
  }
});
