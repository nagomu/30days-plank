import { styled } from 'linaria/react';
import * as React from 'react';

const Svg = styled.svg`
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: top;
`;

export type IconName =
  | 'arrow_back'
  | 'arrow_forward'
  | 'done'
  | 'edit'
  | 'exit_to_app'
  | 'history'
  | 'home'
  | 'info'
  | 'logo'
  | 'logo_google'
  | 'pause'
  | 'play_arrow';

interface Props extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

const Icon: React.FC<Props> = ({ name, ...props }) => (
  <Svg {...props} role="img">
    <use xlinkHref={`#${name}`} />
  </Svg>
);

export default Icon;
