import * as types from "../const/types";

const intialState = {
  citys: [],
  cityLoading: false,
  citySuccess: null,
  cityError: null,
  cityMessage: [],
  venue:[],
  organizer:[]
};

const config = (state = intialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case types.GET_CONFIG_LOCATION_BEGIN:
      return {
        ...state,
        cityLoading: true,
      };
    case types.GET_CONFIG_LOCATION_SUCCESS:
      return {
        ...state,
        citys: payload,
        cityLoading: false,
      };
    case types.GET_CONFIG_LOCATION_FAIL:
      return {
        ...state,
        cityError: true,
        cityLoading: false,
        cityMessage: payload,
        error: error,
      };
    case types.GET_CONFIG_VENUE_BEGIN:
      return {
        ...state,
        cityLoading: true,
      };
    case types.GET_CONFIG_VENUE_SUCCESS:
      return {
        ...state,
        venue: payload,
        cityLoading: false,
      };
    case types.GET_CONFIG_VENUE_FAIL:
      return {
        ...state,
        cityError: true,
        cityLoading: false,
        cityMessage: payload,
        error: error,
      };
    case types.GET_CONFIG_ORGANIZER_BEGIN:
      return {
        ...state,
        cityLoading: true,
      };
    case types.GET_CONFIG_ORGANIZER_SUCCESS:
      return {
        ...state,
        organizer: payload,
        cityLoading: false,
      };
    case types.GET_CONFIG_ORGANIZER_FAIL:
      return {
        ...state,
        cityError: true,
        cityLoading: false,
        cityMessage: payload,
        error: error,
      };
    default:
      return {
        ...state,
      };
  }
};

export default config;
