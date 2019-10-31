import { Global } from '@emotion/core';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import globalStyles from '~/config/globalStyles';
import Routes from '~/config/Routes';
import { store } from '~/store';

ReactDOM.render(
  <Provider store={store}>
    <Global styles={globalStyles} />
    <Routes />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
