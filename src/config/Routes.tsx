import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from '~/containers/specifics/dashboard/Dashboard';
import Login from '~/containers/specifics/login/Login';
import { useAuth } from '~/hooks/common/useAuth';

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user ? (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Routes;
