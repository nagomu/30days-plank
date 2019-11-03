import '~/serviceWorker';

import { Global } from '@emotion/core';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from '~/components/common/Routes';
import { globalStyles } from '~/config';
import { store } from '~/store';

ReactDOM.render(
  <Provider store={store}>
    <Global styles={globalStyles} />
    <Routes />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
