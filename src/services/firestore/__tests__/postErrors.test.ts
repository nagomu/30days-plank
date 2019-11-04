import { errors, postError } from '~/services/firestore';

describe('postError', () => {
  const mockAdd = jest.fn();
  const mock = jest.fn(errors);
  mock.mockImplementation(
    jest.fn().mockReturnValue({
      add: jest.fn().mockResolvedValue(mockAdd()),
    }),
  );

  it('calls errors.add', () => {
    postError(new Error('Error'));
    expect(mockAdd).toBeCalled();
  });
});
