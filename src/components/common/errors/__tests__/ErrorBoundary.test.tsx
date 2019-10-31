import { mount } from 'enzyme';
import * as React from 'react';

import ErrorBoundary from '~/components/common/errors/ErrorBoundary';

describe('ErrorBoundary', () => {
  const wrapper = mount(<ErrorBoundary>children</ErrorBoundary>);

  it('renders children correctly', () => {
    expect(wrapper.text()).toEqual('children');
  });

  it('renders correctly if error', () => {
    wrapper.setState({
      error: jest.fn().mockRejectedValue(new Error('Mock error')),
    });
    wrapper.update();
    expect(wrapper.text()).not.toEqual('children');
  });
});
