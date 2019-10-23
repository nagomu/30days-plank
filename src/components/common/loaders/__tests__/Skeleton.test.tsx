import { mount } from 'enzyme';
import * as React from 'react';

import Skeleton from '~/components/common/loaders/Skeleton';

describe('Skeleton', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Skeleton />);
    expect(wrapper.find('Styled(div)').length).toEqual(1);
  });
});
