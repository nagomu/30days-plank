import * as React from 'react';

import WrapperComponent from '~/components/specifics/dashboard/Dashboard';
import { AuthState } from '~/store/auth';

const Dashboard: React.FC<Pick<AuthState, 'user'>> = props => (
  <WrapperComponent {...props} />
);

export default Dashboard;
