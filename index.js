import LoginPage from 'pages/LoginPage.js';
import HomePage from 'pages/HomePage.js';
import AuthPage from 'pages/AuthPage.js';

const routes = {
  '#/auth': '<AuthPage />',
  '#/login': '<LoginPage />',
  '#/home': '<HomePage />',
}

const App = new Ractive({
  el: 'main',
  template: `
    {{>page}}
  `,
  partials: {
    page: '<AuthPage />'
  },
  components: {
    LoginPage,
    HomePage,
    AuthPage,
  },
  oninit: function() {
    const hashChanged = () => {
      const path = window.location.hash || '#/auth';
      this.resetPartial('page', routes[path]);
    };
    window.addEventListener('hashchange', hashChanged, false);
    hashChanged();
  }
});
