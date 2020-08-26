import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WrappedComponent from '~/components/specifics/archive/Archives';
import { AppState } from '~/store';
import { onFetchArchives } from '~/store/archive';

const Archives: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticating, archives, isArchiveLoading } = useSelector(
    (state: AppState) => ({
      user: state.auth.user,
      isAuthenticating: state.auth.isLoading,
      archives: state.archive.archives,
      isArchiveLoading: state.archive.isLoading,
    }),
  );

  React.useEffect(() => {
    if (user) onFetchArchives(dispatch);
  }, []);

  const isLoading = isAuthenticating !== false || isArchiveLoading !== false;

  return <WrappedComponent archives={archives} isLoading={isLoading} />;
};

export default Archives;
