import { postError } from '~/services/firebase/error';

jest.mock('~/utils/datetime');

/* eslint-disable */
const mockAdd = jest.fn();

jest.mock(
  '~/services/firebase',
  jest.fn().mockReturnValue({
    firebase: {
      firestore: () => ({
        collection: () => ({ add: mockAdd }),
      }),
    },
  }),
);
/* eslint-enable */

describe('postError', () => {
  it('calls firebase.firestore.CollectionReference.add', async () => {
    await postError(new Error('Error'));
    expect(mockAdd).toBeCalled();
  });
});
