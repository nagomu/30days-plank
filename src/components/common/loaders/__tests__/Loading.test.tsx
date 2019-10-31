import { shallow } from 'enzyme';
import * as React from 'react';

import Loading from '~/components/common/loaders/Loading';

describe('Loading', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.find('Styled(div)').length).toEqual(2);
  });
});
