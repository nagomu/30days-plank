import * as React from 'react';

import WrapperComponent from '~/components/App';
import { useAuth } from '~/hooks/common/useAuth';

const App: React.FC = () => {
  const props = useAuth();
  return <WrapperComponent {...props} />;
};

export default App;
