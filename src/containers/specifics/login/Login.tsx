import * as React from 'react';

import WrapperComponent from '~/components/specifics/login/Login';
import { useAuth } from '~/hooks/common/useAuth';

const Login: React.FC = () => {
  const { isLoading, onSignIn } = useAuth();
  return <WrapperComponent isLoading={isLoading} onSignIn={onSignIn} />;
};

export default Login;
