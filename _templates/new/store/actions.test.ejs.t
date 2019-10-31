---
to: src/store/<%= name %>/__tests__/actions.test.ts
---
<%
  uppercase = name.toUpperCase()
  camelized = h.inflection.camelize(name)
-%>
import {
  add<%= camelized %>,
  add<%= camelized %>Success,
  fetch<%= camelized %>,
  fetch<%= camelized %>Success,
  initialState,
  set<%= camelized %>,
} from '~/store/<%= name %>';
import { mockStore } from '~/utils/testHelpers';

describe('<%= name %>: actions', () => {
  describe('fetch<%= camelized %>', () => {
    it('should create valid action', () => {
      const store = mockStore({ <%= name %>: initialState });
      store.dispatch(fetch<%= camelized %>());

      const expected = [{ type: 'FETCH_<%= uppercase %>' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('fetch<%= camelized %>Success', () => {
    it('should create valid action', () => {
      const store = mockStore({ <%= name %>: initialState });
      store.dispatch(fetch<%= camelized %>Success());

      const expected = [{ type: 'FETCH_<%= uppercase %>_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('set<%= camelized %>', () => {
    it('should create valid action', () => {
      const store = mockStore({ <%= name %>: initialState });
      const <%= name %> = {
        uid: 'xxx',
        name: undefined,
        photoURL: undefined,
      };

      store.dispatch(set<%= camelized %>(<%= name %>));
      store.dispatch(set<%= camelized %>(undefined));

      const expected = [
        {
          type: 'SET_<%= uppercase %>',
          payload: {
            <%= name %>,
          },
        },
        {
          type: 'SET_<%= uppercase %>',
          payload: {
            <%= name %>: undefined,
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('add<%= camelized %>', () => {
    it('should create valid action', () => {
      const store = mockStore({ <%= name %>: initialState });
      store.dispatch(add<%= camelized %>());

      const expected = [{ type: 'ADD_<%= uppercase %>' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('add<%= camelized %>Success', () => {
    it('should create valid action', () => {
      const store = mockStore({ <%= name %>: initialState });
      store.dispatch(add<%= camelized %>Success());

      const expected = [{ type: 'ADD_<%= uppercase %>_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });
});
