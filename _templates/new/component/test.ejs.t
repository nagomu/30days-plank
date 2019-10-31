---
to: src/components/<%= type %>/<%= sub %>/__tests__/<%= h.inflection.camelize(name) %>.test.tsx
---
<%
  camelizedName = h.inflection.camelize(name)
-%>
import { mount } from 'enzyme';
import * as React from 'react';

import <%= camelizedName %> from '~/components/<%= type %>/<%= sub %>/<%= camelizedName %>';

describe('<%= camelizedName %>', () => {
  const props = {};

  it('renders correctly', () => {
    const wrapper = mount(<<%= camelizedName %> {...props} />);
    expect(wrapper.find('Foo').length).toEqual(1);
    expect(wrapper.find('Foo Bar').length).toEqual(1);
  });
});
