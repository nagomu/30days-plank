import { mount, shallow } from 'enzyme';
import * as React from 'react';

import App from '~/components/App';

describe('example', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders correctly', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('App').length).toEqual(1);
  });
});
