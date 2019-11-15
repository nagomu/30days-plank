import { styled } from 'linaria/react';
import * as React from 'react';

import TextButton from '~/components/common/buttons/TextButton';

type Props = React.HTMLProps<HTMLButtonElement>;

const ResetButton = styled(TextButton)`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`;

export default ResetButton as React.FC<Props>;
