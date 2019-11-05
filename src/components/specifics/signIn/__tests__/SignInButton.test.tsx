import { mount } from 'enzyme';
import * as React from 'react';

import SignInButton from '~/components/specifics/signIn/SignInButton';

describe('SignInButton', () => {
  const mockClick = jest.fn();
  const wrapper = mount(<SignInButton onClick={mockClick} />);

  it('renders correctly', () => {
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button Icon[name="logo_google"]').length).toEqual(1);
    expect(wrapper.find('button span').text()).toEqual('Sign in with Google');
  });

  it('it callable to onClick', () => {
    const button = wrapper.find('button');
    button.simulate('click');
    expect(mockClick).toHaveBeenCalled();
  });
});
