import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import timekeeper from 'timekeeper';

import ArchivedChallenge from '~/containers/specifics/archive/ArchivedChallenge';
import { workoutFactory } from '~/factories/workoutFactory';
import { mockStore, timestamp } from '~/utils';

const today = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(today);

/* eslint-disable */
type WithProviderParam = {
  Component: React.FC<any>;
  props?: any;
  store?: any;
  pathname?: string;
};
/* eslint-enable */

const withProvider = (params: WithProviderParam): ReactWrapper => {
  const { Component, props, store, pathname } = params;
  const initialEntries = [{ pathname: pathname || '/archives/id' }];
  return mount(
    <Provider store={store || mockStore()}>
      <MemoryRouter initialEntries={initialEntries}>
        <Switch>
          <Route exact path="/archives/:challengeId">
            <Component {...props} />
          </Route>
        </Switch>
      </MemoryRouter>
    </Provider>,
  );
};

describe('ArchivedChallenge', () => {
  const props = {};

  const state = {
    auth: {
      user: { uid: 'uid' },
    },
    challenge: {
      challenge: {
        id: 'id',
        isActive: false,
        workouts: workoutFactory(today),
        createdAt: timestamp(new Date()),
      },
      isLoading: false,
    },
    workout: {
      isLoading: false,
    },
  };

  it('paths correct props', () => {
    const store = mockStore(state);
    const wrapper = withProvider({
      Component: ArchivedChallenge,
      props,
      store,
    });

    const wrappedComponent = wrapper.find(
      'ArchivedChallenge ArchivedChallenge',
    );
    expect(wrappedComponent.length).toEqual(1);
    expect(wrappedComponent.prop('challenge')).toEqual(
      state.challenge.challenge,
    );
    expect(wrappedComponent.prop('challengeId')).toEqual('id');
    expect(wrappedComponent.prop('isLoading')).toEqual(false);
    expect(wrappedComponent.prop('title')).toEqual(
      'Oct 1, 2019 - Oct 30, 2019',
    );
  });

  it('paths "Archive" as title if challenge does not exists', () => {
    const _state = {
      ...state,
      challenge: {
        challenge: undefined,
        isLoading: false,
      },
    };
    const store = mockStore(_state);
    const wrapper = withProvider({
      Component: ArchivedChallenge,
      props,
      store,
    });

    const wrappedComponent = wrapper.find(
      'ArchivedChallenge ArchivedChallenge',
    );
    expect(wrappedComponent.prop('title')).toEqual('Archive');
  });
});

timekeeper.reset();
