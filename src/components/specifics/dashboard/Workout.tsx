import { styled } from 'linaria/react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Label from '~/components/specifics/dashboard/Label';
import { Timestamp } from '~/types';
import { formatDayNumeric, formatShortMonth, rgba } from '~/utils';

type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
  color: string;
};

const Container: React.FC<ContainerProps> = ({ className, children }) => (
  <li className={className}>{children}</li>
);

// FIXME
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const StyledContainer = styled(Container)`
  display: block;
  margin: 0;
  padding: 0;
  border-top: 1px solid #e0e0e0;
  color: ${(props: ContainerProps) => props.color};

  &:first-of-type {
    border-top: 0;
  }
`;
/* eslint-enable */

const buttonStyles = `
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  margin: 0;
  padding: 0;
  color: inherit;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
`;

const Button = styled.span`
  ${buttonStyles}
`;

const NavButton = styled(NavLink)`
  ${buttonStyles}
`;

type Props = {
  id: string;
  isCompleted: boolean;
  isRest: boolean;
  isToday: boolean;
  menu: number;
  pathname: string;
  date: Timestamp;
  title: string;
};

const Workout: React.FC<Props> = props => {
  const { isCompleted, isRest, isToday, menu, pathname, date, title } = props;

  const day = formatDayNumeric(date);
  const month = formatShortMonth(date);

  const color = isToday
    ? '#1e88e5'
    : isRest
    ? rgba('#d32f2f', 0.6)
    : rgba('#212121', 0.6);

  return (
    <StyledContainer color={color}>
      {isRest ? (
        <Button>
          <Label
            day={day}
            isCompleted={isCompleted}
            isRest={isRest}
            menu={menu}
            month={month}
            title={title}
          />
        </Button>
      ) : (
        <NavButton exact to={pathname} role="button">
          <Label
            day={day}
            isCompleted={isCompleted}
            isRest={isRest}
            menu={menu}
            month={month}
            title={title}
          />
        </NavButton>
      )}
    </StyledContainer>
  );
};

export default Workout;
