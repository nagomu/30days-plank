import '~/serviceWorker';

import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from '~/components/common/Routes';
import { store } from '~/store';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
