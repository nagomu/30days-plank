import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '~/store';
import { toggleNav } from '~/store/layout';

type UseLayout = {
  onToggleNav: () => void;
};

export const useLayout = (): UseLayout => {
  const dispatch = useDispatch();
  const { isNavOpen } = useSelector((state: AppState) => ({
    ...state.layout,
  }));

  const onToggleNav = (): void => {
    dispatch(toggleNav(!isNavOpen));
    return;
  };

  return { onToggleNav };
};
