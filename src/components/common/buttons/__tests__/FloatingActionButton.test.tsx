import { mount } from 'enzyme';
import * as React from 'react';

import FloatingActionButton from '~/components/common/buttons/FloatingActionButton';

describe('FloatingActionButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(<FloatingActionButton />);
    expect(wrapper.find('button').length).toEqual(1);
  });
});
