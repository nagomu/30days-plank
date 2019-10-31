---
to: src/store/<%= name %>/reducers.ts
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
  <%= camelized %>State,
  <%= camelized %>ActionTypes,
} from '~/store/<%= name %>';

export const initialState: <%= camelized %>State = {
  <%= name %>: undefined,
  isLoading: undefined,
};

export const <%= name %>Reducer = (
  state = initialState,
  action: <%= camelized %>ActionTypes,
): <%= camelized %>State => {
  switch (action.type) {
    case SET_<%= uppercase %>:
      return {
        ...state,
        isLoading: false,
        <%= name %>: action.payload.<%= name %>,
      };
    case ADD_<%= uppercase %>_SUCCESS:
    case FETCH_<%= uppercase %>_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_<%= uppercase %>:
    case FETCH_<%= uppercase %>:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
