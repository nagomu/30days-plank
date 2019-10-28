import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import App from '~/components/common/layouts/App';
import Login from '~/components/specifics/login/Login';
import Dashboard from '~/containers/specifics/dashboard/Dashboard';
import Workout from '~/containers/specifics/workout/Workout';
import { useAuth } from '~/hooks/specifics/routes/useAuth';

const Routes: React.FC = () => {
  const {
    isAuthenticatedOrWaiting,
    isAuthenticationWaiting,
    onSignIn,
    onSignOut,
    redirectTo,
    user,
  } = useAuth();

  return (
    <BrowserRouter>
      <App
        isLoading={isAuthenticationWaiting}
        onSignOut={onSignOut}
        user={user}
      >
        {isAuthenticatedOrWaiting ? (
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard user={user} />
            </Route>
            <Route
              exact
              path="/challenges/:challengeId/workouts/:id"
              component={Workout}
            />
            <Redirect to={redirectTo} />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <Login onSignIn={onSignIn} />
            </Route>
            <Redirect to="/" />
          </Switch>
        )}
      </App>
    </BrowserRouter>
  );
};

export default Routes;
