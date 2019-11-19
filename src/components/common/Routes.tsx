import loadable from '@loadable/component';
import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import ErrorBoundary from '~/components/common/errors/ErrorBoundary';
import App from '~/components/common/layouts/App';
import Loading from '~/components/common/loaders/Loading';
import { AuthActions, useAuth } from '~/hooks/common/useAuth';
import { currentUser } from '~/services/firebase/auth';

const NotFound = loadable(() => import('~/components/common/errors/NotFound'), {
  fallback: <Loading />,
});

const Archives = loadable(
  () => import('~/containers/specifics/archive/Archives'),
  { fallback: <Loading /> },
);

const Dashboard = loadable(
  () => import('~/containers/specifics/dashboard/Dashboard'),
  { fallback: <Loading /> },
);

const LoadableSignIn = loadable(
  () => import('~/components/specifics/signIn/SignIn'),
  { fallback: <Loading /> },
);

type SignInProps = Pick<AuthActions, 'onSignIn'>;
const SignIn: React.FC<SignInProps> = props => <LoadableSignIn {...props} />;

const Terms = loadable(() => import('~/components/specifics/terms/Terms'), {
  fallback: <Loading />,
});

const Workout = loadable(
  () => import('~/containers/specifics/workout/Workout'),
  { fallback: <Loading /> },
);

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
              <Route exact path="/dashboard" component={Dashboard} />
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
                <SignIn onSignIn={onSignIn} />
              </Route>
              <Route exact path="/terms" component={Terms} />
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
