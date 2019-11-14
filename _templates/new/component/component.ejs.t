---
to: src/components/<%= type %>/<%= sub %>/<%= h.inflection.camelize(name) %>.tsx
---
<%
  camelizedName = h.inflection.camelize(name)
-%>
import { styled } from 'linaria/react';
import * as React from 'react';

import { rgba } from '~/utils';

const Foo = styled.div``;
const Bar = styled.div``;

type Props = {
}

const <%= camelizedName %>: React.FC<Props> = props => (
  <Foo>
    <Bar />
  </Foo>
);

export default <%= camelizedName %>;
