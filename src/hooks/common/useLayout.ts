import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '~/store';
import { toggleDrawer, toggleNav } from '~/store/layout';

type UseLayout = {
  onToggleDrawer: () => void;
  onToggleNav: () => void;
};

export const useLayout = (): UseLayout => {
  const dispatch = useDispatch();
  const { isDrawerOpen, isNavOpen } = useSelector((state: AppState) => ({
    ...state.layout,
  }));

  const onToggleDrawer = (): void => {
    dispatch(toggleDrawer(!isDrawerOpen));
    return;
  };

  const onToggleNav = (): void => {
    dispatch(toggleNav(!isNavOpen));
    return;
  };

  return {
    onToggleDrawer,
    onToggleNav,
  };
};
