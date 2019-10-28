import * as React from 'react';

import Loading from '~/components/common/loaders/Loading';
import Challenge from '~/components/specifics/dashboard/Challenge';
import NotStarted from '~/components/specifics/dashboard/NotStarted';
import { Challenge as ChallengeType } from '~/store/challenge';

type Props = {
  challenge?: ChallengeType;
  isLoading: boolean;
  onAddChallenge: () => void;
};

const Dashboard: React.FC<Props> = props => {
  const { challenge, isLoading, onAddChallenge } = props;

  if (isLoading || !challenge || !challenge.workouts) {
    return <Loading />;
  }

  return (
    <>
      {challenge.workouts.length > 0 ? (
        <Challenge workouts={challenge.workouts} />
      ) : (
        <NotStarted onClick={onAddChallenge} />
      )}
    </>
  );
};

export default Dashboard;
