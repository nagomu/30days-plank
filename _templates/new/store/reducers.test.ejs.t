---
to: src/store/<%= name %>/__tests__/reducers.ts
---
<%
  uppercase = name.toUpperCase()
  camelized = h.inflection.camelize(name)
-%>
import {
  <%= name %>Reducer as reducer,
  initialState,
  add<%= camelized %>,
  add<%= camelized %>Success,
  fetch<%= camelized %>,
  fetch<%= camelized %>Success,
  set<%= camelized %>,
} from '~/store/<%= name %>';

describe('<%= name %>: reducers', () => {
  it('handles FETCH_<%= uppercase %>', () => {
    const expected = {
      isLoading: true,
      <%= name %>: undefined,
    };
    const action = fetch<%= camelized %>();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles FETCH_<%= uppercase %>_SUCCESS', () => {
    const expected = {
      isLoading: true,
      <%= name %>: undefined,
    };
    const action = fetch<%= camelized %>Success();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles SET_<%= uppercase %>', () => {
    const <%= name %> = {
      uid: 'xxx',
      name: undefined,
      photoURL: undefined,
    };
    const expected = {
      isLoading: false,
      <%= name %>,
    };
    const action = set<%= camelized %>(<%= name %>);
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles ADD_<%= uppercase %>', () => {
    const expected = {
      isLoading: true,
      <%= name %>: undefined,
    };
    const action = add<%= camelized %>();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles ADD_<%= uppercase %>_SUCCESS', () => {
    const expected = {
      isLoading: false,
      <%= name %>: undefined,
    };
    const action = add<%= camelized %>Success();
    expect(reducer(initialState, action)).toEqual(expected);
  });
});
