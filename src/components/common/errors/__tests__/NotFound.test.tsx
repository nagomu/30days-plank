import NotFound from '~/components/common/errors/NotFound';
import { withProvider } from '~/utils/testHelpers';

describe('NotFound', () => {
  it('renders correctly', () => {
    const wrapper = withProvider({ Component: NotFound });
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('div section').length).toEqual(1);
    expect(wrapper.find('div h1').length).toEqual(1);
    expect(wrapper.find('div p').length).toEqual(1);
  });
});
