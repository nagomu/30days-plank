import styled from '@emotion/styled';
import firebase from 'firebase';
import * as React from 'react';

import Workout, {
  Props as WorkoutProps,
} from '~/components/specifics/dashboard/Workout';

const Workouts = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Challenges: React.FC = () => {
  const generateMock = (): WorkoutProps[] => {
    const arr = Array.from(Array(30), (_v, k) => k + 1);

    return arr.map(i => ({
      id: `${i}`,
      isCompleted: true,
      isRest: i === 6 || i === 13 || i === 19 || i === 26,
      menu: 20,
      pathname: `/challenges/1/workouts/${i}`,
      scheduledDate: firebase.firestore.Timestamp.fromDate(
        new Date(2019, 9, i),
      ),
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

export default Challenges;
