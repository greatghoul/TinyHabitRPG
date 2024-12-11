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
      <Auth />
    {{/if}}
  `,
  oninit: function() {
    this.loadUser();
    // const hashChanged = () => {
    //   const path = window.location.hash || "#/auth";
    //   this.resetPartial("page", routes[path]);
    // };
    // window.addEventListener("hashchange", hashChanged, false);
    // hashChanged();
  },
  loadUser () {
    const user = window.localStorage["user"];
    this.set({ user });
  }
});
