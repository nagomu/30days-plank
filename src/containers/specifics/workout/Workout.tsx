import * as React from 'react';

import WrappedComponent from '~/containers/specifics/workout/WorkoutTimer';
import { useWorkout } from '~/hooks/common/useWorkout';

const Workout: React.FC = () => {
  const { isLoading, workout } = useWorkout();
  return <WrappedComponent workout={workout} isLoading={isLoading} />;
};

export default Workout;
