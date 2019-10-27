import { mount } from 'enzyme';
import * as React from 'react';

import TextButton from '~/components/common/buttons/TextButton';

describe('TextButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(<TextButton />);
    expect(wrapper.find('button').length).toEqual(1);
  });
});
