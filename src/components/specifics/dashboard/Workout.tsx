import styled from '@emotion/styled';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '~/components/common/icons/Icon';
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

const Button = styled(NavLink)`
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

const Completed = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 48px;
  min-height: 48px;
  margin: 0;
  padding: 12px 8px 12px 16px;
  color: #4caf50;
  font-size: 24px;
`;

const Calendar = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 48px;
  min-height: 48px;
  padding: 8px;
  line-height: 1;
`;

const CalendarDay = styled.span`
  display: block;
  font-size: 24px;
  text-align: center;
`;

const CalendarMonth = styled.span`
  display: block;
  font-size: 12px;
  text-align: center;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 400;

  @media all and (min-width: 680px) {
    font-size: 24px;
  }
`;

const Title = styled.span`
  font-weight: 700;
`;

type Props = {
  id: string;
  isCompleted: boolean;
  isRest: boolean;
  menu: number;
  pathname: string;
  scheduledDate: Timestamp;
  title: string;
};

const Workout: React.FC<Props> = props => {
  const { isCompleted, isRest, menu, pathname, scheduledDate, title } = props;

  // TODO: Refactoring
  const formatDate = (date: number): string =>
    new Intl.DateTimeFormat('en-US').format(date);
  const today = scheduledDate.toDate().getTime();
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(
    today,
  );
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    today,
  );
  const isToday: boolean = formatDate(Date.now()) === formatDate(today);

  const color = isToday
    ? '#1e88e5'
    : isRest
    ? rgba('#d32f2f', 0.6)
    : rgba('#212121', 0.6);

  return (
    <StyledContainer color={color}>
      {/* TODO: It should not link if isRest is true */}
      <Button exact to={pathname} role="button">
        <Completed>{isCompleted ? <Icon name="done" /> : null}</Completed>
        <Calendar>
          <CalendarDay>{day}</CalendarDay>
          <CalendarMonth>{month}</CalendarMonth>
        </Calendar>
        <Label>
          <Title>{isRest ? 'Rest' : title}</Title>
          {!isRest ? `- ${menu} sec` : null}
        </Label>
      </Button>
    </StyledContainer>
  );
};

export default Workout;
