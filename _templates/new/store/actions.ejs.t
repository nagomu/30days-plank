---
to: src/store/<%= name %>/actions.ts
---
<%
  uppercase = name.toUpperCase()
  camelized = h.inflection.camelize(name)
-%>
import {
  ADD_<%= uppercase %>,
  ADD_<%= uppercase %>_SUCCESS,
  FETCH_<%= uppercase %>,
  FETCH_<%= uppercase %>_SUCCESS,
  SET_<%= uppercase %>,
  <%= camelized %>ActionTypes,
  <%= camelized %>,
} from '~/store/<%= name %>';

export const fetch<%= camelized %> = (): <%= camelized %>ActionTypes => ({
  type: FETCH_<%= uppercase %>,
});

export const fetch<%= camelized %>Success = (): <%= camelized %>ActionTypes => ({
  type: FETCH_<%= uppercase %>_SUCCESS,
});

export const set<%= camelized %> = (<%= name %>?: <%= camelized %>): <%= camelized %>ActionTypes => ({
  type: SET_<%= uppercase %>,
  payload: { <%= name %> },
});

export const add<%= camelized %> = (): <%= camelized %>ActionTypes => ({
  type: ADD_<%= uppercase %>,
});

export const add<%= camelized %>Success = (): <%= camelized %>ActionTypes => ({
  type: ADD_<%= uppercase %>_SUCCESS,
});
