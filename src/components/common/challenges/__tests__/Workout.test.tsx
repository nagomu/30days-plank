import timekeeper from 'timekeeper';

import Workout from '~/components/common/challenges/Workout';
import { timestamp, withProvider } from '~/utils';

describe('Workout', () => {
  const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
  timekeeper.freeze(mockToday);

  const props = {
    id: '1',
    isCompleted: true,
    isRest: false,
    isToday: false,
    menu: 20,
    pathname: '/challenges/1/workout/1',
    date: timestamp(mockToday),
    title: 'Day 1',
  };

  it('renders correctly', () => {
    const params = {
      Component: Workout,
      props,
    };
    const wrapper = withProvider(params).find('Workout');

    expect(wrapper.find('li').length).toEqual(1);
    expect(wrapper.find('a[href="/challenges/1/workout/1"]').length).toEqual(1);
    expect(wrapper.find('span Icon[name="done"]').length).toEqual(1);
    expect(wrapper.find('span span').length).toEqual(3);

    const container = wrapper.find('Container');
    expect(container.prop('color')).toEqual('rgba(33, 33, 33, 0.6)');

    const day = wrapper.find('span span').at(0);
    expect(day.text()).toEqual('1');

    const month = wrapper.find('span span').at(1);
    expect(month.text()).toEqual('Oct');

    const title = wrapper.find('span span').at(2);
    expect(title.text()).toEqual('Day 1');
  });

  it('renders correctly if today', () => {
    const params = {
      Component: Workout,
      props: {
        ...props,
        isToday: true,
        date: timestamp(mockToday),
      },
    };
    const wrapper = withProvider(params).find('Workout');
    const container = wrapper.find('Container');
    expect(container.prop('color')).toEqual('#1e88e5');
  });

  it('renders correctly if rest', () => {
    const params = {
      Component: Workout,
      props: {
        ...props,
        isRest: true,
      },
    };
    const wrapper = withProvider(params).find('Workout');
    const container = wrapper.find('Container');
    expect(wrapper.find('a').length).toEqual(0);
    expect(container.prop('color')).toEqual('rgba(211, 47, 47, 0.6)');
  });

  it('renders correctly if archived', () => {
    const params = {
      Component: Workout,
      props: {
        ...props,
        isArchived: true,
      },
    };
    const wrapper = withProvider(params).find('Workout');
    expect(wrapper.find('a').length).toEqual(0);
  });

  timekeeper.reset();
});
