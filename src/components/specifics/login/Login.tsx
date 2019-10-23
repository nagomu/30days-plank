import * as React from 'react';

import Loading from '~/components/common/loaders/Loading';
import { AuthActions, AuthState } from '~/store/auth';

type Props = Pick<AuthActions, 'onSignIn'> & Pick<AuthState, 'isLoading'>;

const Login: React.FC<Props> = ({ isLoading, onSignIn }) => (
  <div>
    {isLoading ? (
      <Loading />
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
