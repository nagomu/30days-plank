jest.mock('../../firebase/asyncOnAuthStateChanged', () => ({
  asyncOnAuthStateChanged: jest
    .fn()
    .mockResolvedValueOnce(null)
    .mockResolvedValueOnce({ uid: 'uid' })
    .mockRejectedValueOnce({ error: 'Error' }),
}));
