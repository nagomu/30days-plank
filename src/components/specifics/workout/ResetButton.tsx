import { styled } from 'linaria/react';

import TextButton from '~/components/common/buttons/TextButton';

const ResetButton = styled(TextButton)`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`;

export default ResetButton;
