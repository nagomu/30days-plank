import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import App, { Props } from '~/containers/common/layouts/App';
import { mockStore } from '~/utils';

describe('AppContainer', () => {
  const props = {
    auth: {
      user: { uid: 'xxx' },
      isLoading: false,
    },
    isNavOpen: false,
    isSmallScreen: true,
    toggleLayout: jest.fn(),
    onSignOut: jest.fn(),
    children: 'children',
  };

  const createWrapper = (_props: Props): ReactWrapper =>
    mount(
      <Provider store={mockStore()}>
        <MemoryRouter>
          <App {..._props} />
        </MemoryRouter>
      </Provider>,
    );

  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });

  it('renders correctly if small screen', () => {
    const app = createWrapper(props);
    expect(app.find('header button').length).toEqual(1);
  });

  it('renders correctly if not small screen', () => {
    const _props = {
      ...props,
      isSmallScreen: false,
    };
    const app = createWrapper(_props);
    expect(app.find('Nav').length).toEqual(1);
    expect(app.find('main').length).toEqual(1);
  });

  it.skip('TODO: Add test of changeLayout', () => {});
});
