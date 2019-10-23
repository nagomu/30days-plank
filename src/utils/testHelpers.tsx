import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

export const mockStore = configureStore([]);

/* eslint-disable @typescript-eslint/no-explicit-any */
type WithProviderParam = {
  Component: React.FC<any>;
  props?: any;
  store?: any;
};
/* eslint-enable */

export const withProvider = (params: WithProviderParam): ReactWrapper => {
  const { Component, props, store } = params;
  return mount(
    <Provider store={store || mockStore()}>
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    </Provider>,
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withHook = (hook: any, store?: any): any => {
  let result;

  const Component = (): null => {
    result = hook();
    return null;
  };

  withProvider({ Component, props: {}, store });

  return result;
};
