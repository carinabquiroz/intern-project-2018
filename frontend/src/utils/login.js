const login = (props, state) => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username: state.username, password: state.password }),
    })
    .then(res => {
      if ((200 <= res.status) && (res.status < 300)) {
        return res.json().then(json => props.login(json.token));
      }
    });
  };

export default login;
