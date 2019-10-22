import * as React from 'react';

import { AuthActions, AuthState } from '~/store/auth';

type Props = Pick<AuthActions, 'onSignIn'> & Pick<AuthState, 'isLoading'>;

const Login: React.FC<Props> = ({ isLoading, onSignIn }) => (
  <div>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <>
        <h1>Authentication required</h1>
        <p>
          <button type="button" onClick={onSignIn}>
            Sign in with GitHub
          </button>
        </p>
      </>
    )}
  </div>
);

export default Login;
