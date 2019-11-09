import Archives from '~/components/specifics/archive/Archives';
import { timestamp, withProvider } from '~/utils';

describe('Archives', () => {
  const props = {
    archives: [
      {
        achievementRate: 80,
        challengeId: '1',
        createdAt: timestamp(new Date()),
        id: '1',
        title: 'title1',
      },
      {
        achievementRate: 100,
        challengeId: '2',
        createdAt: timestamp(new Date()),
        id: '2',
        title: 'title1',
      },
      {
        achievementRate: 79,
        challengeId: '3',
        createdAt: timestamp(new Date()),
        id: '3',
        title: 'title1',
      },
    ],
    isLoading: false,
  };

  it('renders correctly', () => {
    const wrapper = withProvider({ Component: Archives, props });

    expect(wrapper.find('DrawerScreen').length).toEqual(1);
    // expect(wrapper.find('ul NavLink').length).toEqual(3);
    expect(wrapper.find('ul li').length).toEqual(3);
    expect(wrapper.find('span.isCompleted').length).toEqual(2);
  });

  it('renders message correctly if archives are empty', () => {
    const _props = {
      ...props,
      archives: [],
    };
    const wrapper = withProvider({ Component: Archives, props: _props });

    expect(wrapper.find('DrawerScreen').length).toEqual(1);
    expect(wrapper.text()).toContain('There is no archive yet.');
  });
});
