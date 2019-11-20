import timekeeper from 'timekeeper';

import ArchivedChallenge from '~/components/specifics/archive/ArchivedChallenge';
import { workoutFactory } from '~/factories/workoutFactory';
import { timestamp } from '~/utils';
import { withProvider } from '~/utils/testHelpers';

const today = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(today);

describe('ArchivedChallenge', () => {
  const props = {
    challenge: {
      isActive: false,
      workouts: workoutFactory(today),
      createdAt: timestamp(new Date()),
    },
    challengeId: 'id',
    isLoading: false,
    title: 'title',
  };

  it('renders correctly', () => {
    const wrapper = withProvider({ Component: ArchivedChallenge, props });

    expect(wrapper.find('DrawerScreen').length).toEqual(1);
    expect(wrapper.find('Workouts').length).toEqual(1);
    expect(wrapper.find('NotFound').length).toEqual(0);
  });

  it('renders NotFound if challengeId does not exists', () => {
    const _props = {
      ...props,
      challengeId: undefined,
    };
    const wrapper = withProvider({
      Component: ArchivedChallenge,
      props: _props,
    });

    expect(wrapper.find('Workouts').length).toEqual(0);
    expect(wrapper.find('NotFound').length).toEqual(1);
  });

  it('renders challenge if challengeId does not exists', () => {
    const _props = {
      ...props,
      challenge: undefined,
    };
    const wrapper = withProvider({
      Component: ArchivedChallenge,
      props: _props,
    });

    expect(wrapper.find('Workouts').length).toEqual(0);
    expect(wrapper.find('NotFound').length).toEqual(1);
  });

  it('renders Loading if isLoading', () => {
    const _props = {
      ...props,
      isLoading: true,
    };
    const wrapper = withProvider({
      Component: ArchivedChallenge,
      props: _props,
    });

    expect(wrapper.find('Loading').length).toEqual(1);
    expect(wrapper.find('Workouts').length).toEqual(0);
    expect(wrapper.find('NotFound').length).toEqual(0);
  });
});

timekeeper.reset();
