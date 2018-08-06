import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, loggedIn, componentProps, ...rest }) => (
  <Route
    {...rest}
    render = { props =>
      loggedIn ? (
        <Component {...props} {...componentProps} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
  }
  />
);

export default ProtectedRoute;
