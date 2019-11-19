import * as React from 'react';

import Workouts from '~/components/common/challenges/Workouts';
import NotFound from '~/components/common/errors/NotFound';
import DrawerScreen from '~/components/common/layouts/DrawerScreen';
import { Challenge } from '~/types';

type Props = {
  challenge?: Challenge;
  challengeId?: string;
  isLoading: boolean;
  title: string;
};

const ArchivedChallenge: React.FC<Props> = props => {
  const { challenge, challengeId, isLoading, title } = props;

  return (
    <DrawerScreen title={title} pathname="/archives" isLoading={isLoading}>
      {!challengeId || !challenge ? (
        <NotFound />
      ) : (
        <Workouts
          challengeId={challengeId}
          isArchived={true}
          todaysWorkout={undefined}
          workouts={challenge.workouts}
        />
      )}
    </DrawerScreen>
  );
};

export default ArchivedChallenge;
