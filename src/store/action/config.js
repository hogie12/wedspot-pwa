import * as types from "../const/types";

export const getLocation = () => {
  return {
    type: types.GET_CONFIG_LOCATION_BEGIN,
  };
};
export const getVenue = () => {
  return {
    type: types.GET_CONFIG_VENUE_BEGIN,
  };
};
export const getOrganizer = () => {
  return {
    type: types.GET_CONFIG_ORGANIZER_BEGIN,
  };
};
