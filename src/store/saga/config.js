import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

import { BASE_URL } from "../const/server";
import * as types from "../const/types";

function* getLocation(actions) {
  const { error } = actions;
  try {
    const res = yield axios.get(`${BASE_URL}/config/locations`);
    yield put({
      type: types.GET_CONFIG_LOCATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: types.GET_CONFIG_LOCATION_FAIL,
      error: error,
    });
  }
}
function* getVenue(actions) {
  try {
    const res = yield axios.get(`${BASE_URL}/config/venue`);
    yield put({
      type: types.GET_CONFIG_VENUE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: types.GET_CONFIG_VENUE_FAIL,
      error: err.response,
    });
  }
}
function* getOrganizer(actions) {
  try {
    const res = yield axios.get(`${BASE_URL}/config/organizer`);
    yield put({
      type: types.GET_CONFIG_ORGANIZER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: types.GET_CONFIG_ORGANIZER_FAIL,
      error: err.response,
    });
  }
}

export function* watchGetLocation() {
  yield takeEvery(types.GET_CONFIG_LOCATION_BEGIN, getLocation);
}
export function* watchGetVenue() {
  yield takeEvery(types.GET_CONFIG_VENUE_BEGIN, getVenue);
}
export function* watchGetOrganizer() {
  yield takeEvery(types.GET_CONFIG_ORGANIZER_BEGIN, getOrganizer);
}
