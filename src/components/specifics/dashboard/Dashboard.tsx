import * as React from 'react';

import Loading from '~/components/common/loaders/Loading';
import ChallengeList from '~/components/common/challenges/Challenge';
import NotStarted from '~/components/specifics/dashboard/NotStarted';
import { Challenge } from '~/types';
import { isEmptyArray } from '~/utils';

type Props = {
  challenge?: Challenge;
  isLoading: boolean;
  onAddChallenge: () => void;
};

const Dashboard: React.FC<Props> = props => {
  const { challenge, isLoading, onAddChallenge } = props;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!!challenge && !isEmptyArray(challenge.workouts) ? (
        <ChallengeList
          challengeId={challenge.id}
          workouts={challenge.workouts}
        />
      ) : (
        <NotStarted onClick={onAddChallenge} />
      )}
    </>
  );
};

export default Dashboard;
