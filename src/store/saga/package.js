import axios from "axios";
import * as types from "../const/types";
import { BASE_URL } from "../const/server";
import { put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const vendor = state => state.vendorData

function* packageList(action) {
  const token = yield select(vendor);
  const { page, limit } = action;
  try {
    const res = yield axios.get(
      `${BASE_URL}/packages/vendor?page=${page}&limit=${limit}`,
      { headers: { Authorization: `Bearer ${token.token}` } }
    );
    yield put({
      type: types.GET_ALL_PACKAGE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_ALL_PACKAGE_FAIL,
      payload: error.response.data.errors,
    });
  }
}

function* packageById(action) {
  const { id } = action;
  try {
    const res = yield axios.get(`${BASE_URL}/packages/${id}`);
    yield put({
      type: types.GET_PACKAGE_ID_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_PACKAGE_ID_FAIL,
      payload: error.response.data.errors,
    });
  }
}

function* createPackage(action) {
  const { props } = action;
  const token = yield select(vendor);
  let dataToSend = new FormData();
  dataToSend.append("package_name", props.package_name);
  dataToSend.append("package_location", props.package_location);
  dataToSend.append("package_details", props.package_details);
  dataToSend.append("package_price", props.package_price);
  props.package_services.map((data) => {
    return dataToSend.append("package_services", data);
  });
  dataToSend.append("package_capacity", props.package_capacity);
  props.package_album.map((data) => {
    return dataToSend.append("package_album", data);
  });
  try {
    const res = yield axios.post(`${BASE_URL}/packages`, dataToSend, {
      headers: { Authorization: `Bearer ${token.token}` },
    });
    yield put({
      type: types.CREATE_PACKAGE_SUCCESS,
      payload: res.data,
    });
    yield toast.success("Success", {
      position: "top-left",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    yield put({
      type: types.CREATE_PACKAGE_FAIL,
      payload: error.response,
    });
    yield error.response.data.errors.map((data) => {
      return toast.error(data, {
        position: "top-left",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }
}

function* editPackage(action) {
  const { props } = action;
  const token = yield select(vendor);
  let dataToSend = new FormData();
  dataToSend.append("package_name", props.package_name);
  dataToSend.append("package_location", props.package_location);
  dataToSend.append("package_details", props.package_details);
  dataToSend.append("package_price", props.package_price);
  props.package_services.map((data) => {
    return dataToSend.append("package_services", data);
  });
  dataToSend.append("package_capacity", props.package_capacity);
  props.package_album.map((data) => {
    return dataToSend.append("package_album", data);
  });
  try {
    const res = yield axios.put(
      `${BASE_URL}/packages/${props.package_id}`,
      dataToSend,
      { headers: { Authorization: `Bearer ${token.token}` } }
    );
    yield put({
      type: types.EDIT_PACKAGE_SUCCESS,
      payload: res.data,
    });
    yield toast.success("Success", {
      position: "top-left",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    yield put({
      type: types.EDIT_PACKAGE_FAIL,
      payload: error.response,
    });
    yield error.response.data.errors.map((data) => {
      return toast.error(data, {
        position: "top-left",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    
  }
}

function* deletePackage(action) {
  const { id } = action;
  const token = yield select(vendor);
  try {
    const res = yield axios.delete(`${BASE_URL}/packages/${id}`, {
      headers: { Authorization: `Bearer ${token.token}` },
    });
    yield put({
      type: types.DELETE_PACKAGE_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_PACKAGE_FAIL,
      payload: error.response,
    });
  }
}

export function* watchAllPackage() {
  yield takeEvery(types.GET_ALL_PACKAGE_BEGIN, packageList);
}

export function* watchPackageById() {
  yield takeEvery(types.GET_PACKAGE_ID_BEGIN, packageById);
}

export function* watchCreatePackage() {
  yield takeEvery(types.CREATE_PACKAGE_BEGIN, createPackage);
}

export function* watchEditPackage() {
  yield takeEvery(types.EDIT_PACKAGE_BEGIN, editPackage);
}

export function* watchDeletePackage() {
  yield takeEvery(types.DELETE_PACKAGE_BEGIN, deletePackage);
}
