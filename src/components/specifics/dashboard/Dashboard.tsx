import * as React from 'react';

import Loading from '~/components/common/loaders/Loading';
import Challenge from '~/components/specifics/dashboard/Challenge';
import NotStarted from '~/components/specifics/dashboard/NotStarted';
import { Challenge as ChallengeType } from '~/store/challenge';
import { isEmptyArray } from '~/utils';

type Props = {
  challenge?: ChallengeType;
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
        <Challenge challengeId={challenge.id} workouts={challenge.workouts} />
      ) : (
        <NotStarted onClick={onAddChallenge} />
      )}
    </>
  );
};

export default Dashboard;
