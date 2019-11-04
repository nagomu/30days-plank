import { mount } from 'enzyme';
import * as React from 'react';

import SignIn from '~/components/specifics/signIn/SignIn';

describe('SignIn', () => {
  const wrapper = mount(<SignIn onSignIn={jest.fn()} />);

  it('renders correctly', () => {
    expect(wrapper.find('div section').length).toEqual(1);
    expect(wrapper.find('div section h2').length).toEqual(1);
    expect(wrapper.find('div section SignInButton').length).toEqual(1);
  });
});
