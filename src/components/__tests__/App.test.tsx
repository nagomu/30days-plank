import { mount, shallow } from 'enzyme';
import * as React from 'react';

import App from '~/components/App';

describe('example', () => {
  const props = {
    user: undefined,
    isLoading: undefined,
    onSignIn: jest.fn(),
    onSignOut: jest.fn(),
  };

  it('renders correctly', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders correctly', () => {
    const wrapper = mount(<App {...props} />);
    expect(wrapper.find('App').length).toEqual(1);
  });
});
