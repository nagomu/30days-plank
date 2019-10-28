import styled from '@emotion/styled';
import * as React from 'react';

import Icon from '~/components/common/icons/Icon';

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

const Text = styled.span`
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
  day: string;
  isCompleted: boolean;
  isRest: boolean;
  menu: number;
  month: string;
  title: string;
};

const Label: React.FC<Props> = props => {
  const { day, isCompleted, isRest, menu, month, title } = props;

  return (
    <>
      <Completed>{isCompleted ? <Icon name="done" /> : null}</Completed>
      <Calendar>
        <CalendarDay>{day}</CalendarDay>
        <CalendarMonth>{month}</CalendarMonth>
      </Calendar>
      <Text>
        <Title>{isRest ? 'Rest' : title}</Title>
        {!isRest ? `- ${menu} sec` : null}
      </Text>
    </>
  );
};

export default Label;
