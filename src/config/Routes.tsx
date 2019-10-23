import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import App from '~/components/common/layouts/App';
import Login from '~/components/specifics/login/Login';
import Dashboard from '~/containers/specifics/dashboard/Dashboard';
import { useAuth } from '~/hooks/common/useAuth';

const Routes: React.FC = () => {
  const props = useAuth();

  return (
    <BrowserRouter>
      <App {...props}>
        {props.user ? (
          <Switch>
            <Route path="/dashboard">
              <Dashboard user={props.user} />
            </Route>
            <Redirect from="/" to="/dashboard" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <Login onSignIn={props.onSignIn} />
            </Route>
            <Redirect to="/" />
          </Switch>
        )}
      </App>
    </BrowserRouter>
  );
};

export default Routes;
