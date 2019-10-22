import * as React from 'react';

import WrapperComponent from '~/components/specifics/dashboard/Dashboard';
import { useAuth } from '~/hooks/common/useAuth';

const Dashboard: React.FC = () => {
  const { isLoading, onSignOut, user } = useAuth();

  return (
    <WrapperComponent isLoading={isLoading} onSignOut={onSignOut} user={user} />
  );
};

export default Dashboard;
