import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Loading from '~/components/common/loaders/Loading';
import WrappedComponent from '~/containers/specifics/workout/WorkoutTimer';
import { useWorkout } from '~/hooks/common/useWorkout';

type Props = RouteComponentProps<{ id: string }>;

const Workout: React.FC<Props> = props => {
  const { isLoading, workout } = useWorkout(props.match.params.id);
  if (!workout || isLoading) return <Loading />;
  return <WrappedComponent {...workout} isLoading={isLoading} />;
};

export default Workout;
