import Challenge from '~/components/specifics/dashboard/Challenge';
import { Workout } from '~/store/workout';
import { timestampFromDate } from '~/utils/firebase';
import { withProvider } from '~/utils/testHelpers';

describe('Challenge', () => {
  const mockWorkuts = (): Workout[] => {
    const arr = Array.from(Array(30), (_v, k) => k + 1);
    return arr.map(i => ({
      id: `${i}`,
      isCompleted: true,
      isRest: i === 6 || i === 13 || i === 19 || i === 26,
      menu: 20,
      scheduledDate: timestampFromDate(new Date(2019, 9, i)),
      title: i === 6 || i === 13 || i === 19 || i === 26 ? 'REST' : `Day ${i}`,
    }));
  };

  const props = {
    workouts: mockWorkuts(),
  };

  const wrapper = withProvider({ Component: Challenge, props });

  it('renders correctly', () => {
    expect(wrapper.find('Challenge').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
  });
});
