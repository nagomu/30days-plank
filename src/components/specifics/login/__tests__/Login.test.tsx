import { mount } from 'enzyme';
import * as React from 'react';

import Login from '~/components/specifics/login/Login';

describe('Login', () => {
  const wrapper = mount(<Login onSignIn={jest.fn()} />);

  it('renders correctly', () => {
    expect(wrapper.find('div section').length).toEqual(1);
    expect(wrapper.find('div section h2').length).toEqual(1);
    expect(wrapper.find('div section SignInButton').length).toEqual(1);
  });
});
