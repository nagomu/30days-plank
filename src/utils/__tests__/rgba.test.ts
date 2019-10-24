import rgba from '~/utils/rgba';

describe('utils: rgba', () => {
  it('handles hex code', () => {
    expect(rgba('#98FB98', 0.1)).toEqual('rgba(152, 251, 152, 0.1)');
    expect(rgba('#000', 0.1)).toEqual('rgba(0, 0, 0, 0.1)');
    expect(rgba('#000080', 0.1)).toEqual('rgba(0, 0, 128, 0.1)');
    expect(rgba('#f5f5f5', 0.1)).toEqual('rgba(245, 245, 245, 0.1)');
  });

  it('handles invalid hex code', () => {
    expect(() => rgba('#GGG', 0.1)).toThrowError(
      new Error('#GGG is not a color'),
    );
  });
});
