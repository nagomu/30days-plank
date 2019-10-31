import { calculateRate } from '~/store/archive/utils/calculateRate';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';

describe('calculateRate', () => {
  it('returns rate correctly', () => {
    const workouts = mockWorkouts().map((workout, i) => ({
      ...workout,
      isCompleted: i === 5 || i === 10 ? false : true,
    }));
    expect(calculateRate(workouts)).toEqual(93);
  });
});
