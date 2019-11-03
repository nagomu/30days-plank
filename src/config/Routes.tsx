import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import ErrorBoundary from '~/components/common/errors/ErrorBoundary';
import NotFound from '~/components/common/errors/NotFound';
import Login from '~/components/specifics/login/Login';
import App from '~/containers/common/layouts/App';
import Archives from '~/containers/specifics/archive/Archives';
import Dashboard from '~/containers/specifics/dashboard/Dashboard';
import Workout from '~/containers/specifics/workout/Workout';
import { useAuth } from '~/hooks/specifics/routes/useAuth';
import { currentUser } from '~/services/firebase';

const Routes: React.FC = () => {
  const {
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
        <ErrorBoundary>
          {currentUser() ? (
            <Switch>
              <Route exact path="/dashboard">
                <Dashboard user={user} />
              </Route>
              <Route exact path="/archives" component={Archives} />
              <Route
                exact
                path="/challenges/:challengeId/workouts/:id"
                component={Workout}
              />
              <Redirect to={redirectTo} />
              <Redirect from="/" to="/dashboard" />
              <Route component={NotFound} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/">
                <Login onSignIn={onSignIn} />
              </Route>
              <Redirect to="/" />
              <Route component={NotFound} />
            </Switch>
          )}
        </ErrorBoundary>
      </App>
    </BrowserRouter>
  );
};

export default Routes;
