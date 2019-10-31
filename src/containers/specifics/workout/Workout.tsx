import * as React from 'react';

import WrappedComponent from '~/containers/specifics/workout/WorkoutTimer';
import { useWorkout } from '~/hooks/common/useWorkout';

const Workout: React.FC = () => <WrappedComponent {...useWorkout()} />;

export default Workout;
