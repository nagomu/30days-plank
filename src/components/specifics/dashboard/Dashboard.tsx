import * as React from 'react';

import { AuthState } from '~/store/auth';

const Dashboard: React.FC<Pick<AuthState, 'user'>> = ({ user }) => (
  <section>
    <h2>Hello! {user && user.name && <strong>{user.name}</strong>}</h2>
  </section>
);

export default Dashboard;
