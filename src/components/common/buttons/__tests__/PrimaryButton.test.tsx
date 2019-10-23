import { mount } from 'enzyme';
import * as React from 'react';

import PrimaryButton from '~/components/common/buttons/PrimaryButton';

describe('PrimaryButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(<PrimaryButton />);
    expect(wrapper.find('button').length).toEqual(1);
  });
});
