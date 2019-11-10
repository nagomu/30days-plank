import Archives from '~/containers/specifics/archive/Archives';
import { mockStore, timestamp, withProvider } from '~/utils';

describe('ArchivesContainer', () => {
  const props = {
    user: { uid: 'xxx' },
  };

  it('renders correctly if archives are not empty', () => {
    const store = {
      auth: {
        user: { uid: 'xxx' },
        isLoading: false,
      },
      archive: {
        archives: [
          {
            rate: 80,
            challengeId: '1',
            createdAt: timestamp(new Date()),
            id: '1',
            title: 'title1',
          },
          {
            rate: 100,
            challengeId: '2',
            createdAt: timestamp(new Date()),
            id: '2',
            title: 'title1',
          },
          {
            rate: 79,
            challengeId: '3',
            createdAt: timestamp(new Date()),
            id: '3',
            title: 'title1',
          },
        ],
        isLoading: false,
      },
    };

    const wrapper = withProvider({
      Component: Archives,
      props,
      store: mockStore(store),
    });

    // expect(wrapper.find('ul NavLink').length).toEqual(3);
    expect(wrapper.find('ul li').length).toEqual(3);
  });
});
