import { generateTitle } from '~/store/archive/utils/generateTitle';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';

describe('generateTitle', () => {
  it('returns title correctly', () => {
    const workouts = mockWorkouts();
    expect(generateTitle(workouts)).toEqual('Oct 1, 2019 - Oct 30, 2019');
  });
});
