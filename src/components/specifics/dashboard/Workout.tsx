import styled from '@emotion/styled';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Label from '~/components/specifics/dashboard/Label';
import { formatDayNumeric, formatShortMonth } from '~/utils/datetime';
import { Timestamp } from '~/utils/firebase';
import rgba from '~/utils/rgba';

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

const SpanButton = styled.span`
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

const Button = SpanButton.withComponent(NavLink);

type Props = {
  id: string;
  isCompleted: boolean;
  isRest: boolean;
  isToday: boolean;
  menu: number;
  pathname: string;
  scheduledDate: Timestamp;
  title: string;
};

const Workout: React.FC<Props> = props => {
  const {
    isCompleted,
    isRest,
    isToday,
    menu,
    pathname,
    scheduledDate,
    title,
  } = props;

  const day = formatDayNumeric(scheduledDate);
  const month = formatShortMonth(scheduledDate);

  const color = isToday
    ? '#1e88e5'
    : isRest
    ? rgba('#d32f2f', 0.6)
    : rgba('#212121', 0.6);

  return (
    <StyledContainer color={color}>
      {isRest ? (
        <SpanButton>
          <Label
            day={day}
            isCompleted={isCompleted}
            isRest={isRest}
            menu={menu}
            month={month}
            title={title}
          />
        </SpanButton>
      ) : (
        <Button exact to={pathname} role="button">
          <Label
            day={day}
            isCompleted={isCompleted}
            isRest={isRest}
            menu={menu}
            month={month}
            title={title}
          />
        </Button>
      )}
    </StyledContainer>
  );
};

export default Workout;
