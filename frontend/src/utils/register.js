const register = (props, state) => {
  fetch('/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username: state.username, password: state.password }),
  })
  .then(res => {
    if (res.status === 200) {
      return res.json();
    }
  })
  .then(json => {
    props.login(json.token);
  });
};

export default register;
