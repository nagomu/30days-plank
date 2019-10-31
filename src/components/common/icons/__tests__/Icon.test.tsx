import { shallow } from 'enzyme';
import * as React from 'react';

import Icon from '~/components/common/icons/Icon';

describe('Icon', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Icon name="arrow_back" />);
    expect(wrapper.find('Styled(svg)').length).toEqual(1);
    expect(wrapper.find('use[xlinkHref="#arrow_back"]').length).toEqual(1);
  });
});
