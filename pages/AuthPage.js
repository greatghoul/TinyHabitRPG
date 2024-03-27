const AuthPage = Ractive.extend({
  template: `Loading...`,
  oninit: function () {
    if ('user' in window.localStorage) {
      window.location.hash = '#/home';
    } else {
      window.location.hash = '#/login';
    }
  }
});

export default AuthPage;
