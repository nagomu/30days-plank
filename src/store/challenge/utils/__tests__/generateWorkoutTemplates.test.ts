import { generateWorkoutTemplates } from '~/store/challenge/utils/generateWorkoutTemplates';

describe('generateWorkoutTemplates', () => {
  it('returns valid WorkoutTemplate', () => {
    const templates = generateWorkoutTemplates();
    expect(templates[0].title).toEqual('Day 1');
    expect(templates[29].title).toEqual('Day 30');
  });
});
