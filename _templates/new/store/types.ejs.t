---
to: src/store/<%= name %>/types.ts
---
<%
  uppercase = name.toUpperCase()
  camelized = h.inflection.camelize(name)
-%>
export type <%= camelized %> = {
  // TODO
};

export type <%= camelized %>State = {
  <%= name %>?: <%= camelized %>;
  isLoading?: boolean;
};

export const FETCH_<%= uppercase %> = 'FETCH_<%= uppercase %>';
export type Fetch<%= camelized %>Action = {
  type: typeof FETCH_<%= uppercase %>;
};

export const FETCH_<%= uppercase %>_SUCCESS = 'FETCH_<%= uppercase %>_SUCCESS';
export type Fetch<%= camelized %>SuccessAction = {
  type: typeof FETCH_<%= uppercase %>_SUCCESS;
};

export const SET_<%= uppercase %> = 'SET_<%= uppercase %>';
export type Set<%= camelized %>Action = {
  type: typeof SET_<%= uppercase %>;
  payload: {
    <%= name %>?: <%= camelized %>;
  };
};

export const ADD_<%= uppercase %> = 'ADD_<%= uppercase %>';
export type Add<%= camelized %>Action = {
  type: typeof ADD_<%= uppercase %>;
};

export const ADD_<%= uppercase %>_SUCCESS = 'ADD_<%= uppercase %>_SUCCESS';
export type Add<%= camelized %>SuccessAction = {
  type: typeof ADD_<%= uppercase %>_SUCCESS;
};

export type <%= camelized %>ActionTypes =
  | Fetch<%= camelized %>Action
  | Fetch<%= camelized %>SuccessAction
  | Set<%= camelized %>Action
  | Add<%= camelized %>Action
  | Add<%= camelized %>SuccessAction;
