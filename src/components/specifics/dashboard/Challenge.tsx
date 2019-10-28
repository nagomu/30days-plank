import styled from '@emotion/styled';
import * as React from 'react';

import Workout, {
  Props as WorkoutProps,
} from '~/components/specifics/dashboard/Workout';
import { timestampFromDate } from '~/utils/firebase';

const Workouts = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Challenge: React.FC = () => {
  const generateMock = (): WorkoutProps[] => {
    const arr = Array.from(Array(30), (_v, k) => k + 1);

    return arr.map(i => ({
      id: `${i}`,
      isCompleted: true,
      isRest: i === 6 || i === 13 || i === 19 || i === 26,
      menu: 20,
      pathname: `/challenges/1/workouts/${i}`,
      scheduledDate: timestampFromDate(new Date(2019, 9, i)),
      title: i === 6 || i === 13 || i === 19 || i === 26 ? 'REST' : `Day ${i}`,
    }));
  };

  return (
    <Workouts>
      {generateMock().map(props => (
        <Workout key={props.id} {...props} />
      ))}
    </Workouts>
  );
};

export default Challenge;
