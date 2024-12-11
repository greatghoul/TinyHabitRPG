export default Ractive.extend({
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
          if (data.success) {
            const user = data.data;
            window.localStorage.setItem('user', JSON.stringify(user));
            this.fire('login', user);
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
