import * as React from 'react';

import Challenges from '~/components/specifics/dashboard/Challenges';
import { AuthState } from '~/store/auth';

const Dashboard: React.FC<Pick<AuthState, 'user'>> = ({ user }) => {
  console.log(user);
  return <Challenges />;
};

export default Dashboard;
