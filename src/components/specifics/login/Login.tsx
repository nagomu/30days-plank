import * as React from 'react';

import { AuthActions } from '~/store/auth';

type Props = Pick<AuthActions, 'onSignIn'>;

const Login: React.FC<Props> = ({ onSignIn }) => (
  <section>
    <h2>
      Let&apos;s start
      <br />
      30 Days Plank Challenge
    </h2>
    <p>
      <button type="button" onClick={onSignIn}>
        Sign in with GitHub
      </button>
    </p>
  </section>
);

export default Login;
