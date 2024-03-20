Ractive.components.AuthPage = Ractive.extend({
  template: `Loading...`,
  oninit: function() {
    console.log(window.localStorage['user']);
    if ('user' in window.localStorage) {
      window.location.hash = '#/home';
    } else {
      window.location.hash = '#/login';
    }
  }
});

Ractive.components.LoginPage = Ractive.extend({
  data() {
    return {
      username: '',
      password: ''
    };
  },
  template: `
    <form on-submit='handleSubmit'>
      <label>
        Username:
        <input type='text' name='username' value='{{username}}' />
      </label>
      <label>
        Password:
        <input type='password' name='password' value='{{password}}' />
      </label>
      <button type='submit'>Login</button>
    </form>
  `,
  on: {
    handleSubmit(ctx) {
      ctx.original.preventDefault();

      const username = this.get('username');
      const password = this.get('password');

      fetch('https://habitica.com/api/v3/user/auth/local/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log('success', data);
          if (data.success) {
            window.localStorage.setItem('user', JSON.stringify(data.data));
            window.location.hash = '#/home';
          } else {
            console.error(data.message);
            window.alert(data.message);
          }
        })
        .catch(err => {
          console.error(err);
          window.alert('Login failed.');
        });
    }
  },
});

Ractive.components.HomePage = Ractive.extend({
  template: `<h1>Home</h1>`,
});

const routes = {
  '#/auth': '<AuthPage />',
  '#/login': '<LoginPage />',
  '#/home': '<HomePage />',
}

const App = new Ractive({
  el: 'main',
  template: `
    <nav>
      <a href="#/login">Login</a>
      <a href="#/home">Home</a>
    </nav>
    <hr/>
    {{>page}}
  `,
  partials: {
    page: '<AuthPage />'
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
