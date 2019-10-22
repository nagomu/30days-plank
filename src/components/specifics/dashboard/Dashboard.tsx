import * as React from 'react';

import { AuthState, AuthActions } from '~/store/auth';

type Props = Pick<AuthActions, 'onSignOut'> & AuthState;

const Dashboard: React.FC<Props> = props => {
  const { isLoading, onSignOut, user } = props;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Hello! {user && user.name && <strong>{user.name}</strong>}</h1>
      <p>
        <button type="button" onClick={onSignOut}>
          <svg width="16" height="16">
            <use xlinkHref="#exit_to_app" />
          </svg>
          Sign out
        </button>
      </p>
    </div>
  );
};

export default Dashboard;
