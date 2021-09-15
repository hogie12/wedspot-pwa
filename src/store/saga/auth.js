import axios from "axios";
import * as types from "../const/types";
import { BASE_URL } from "../const/server";
import { put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("token");
const vendor = state => state.vendorData

function* vendorLogin(action) {
  try {
    const res = yield axios.post(`${BASE_URL}/vendors/login`, action.action);
    yield localStorage.setItem("token", res.data.token);
    yield put({
      type: types.LOGIN_SUCCESS,
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
    console.log(error.response.data.errors[0]);
    yield put({
      type: types.LOGIN_FAIL,
      payload: error.response.data.errors,
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

function* vendorRegister(action) {
  try {
    const res = yield axios.post(`${BASE_URL}/vendors/register`, action.action);
    yield localStorage.setItem("token", res.data.token);
    yield put({
      type: types.REGISTER_SUCCESS,
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
    console.log(error);
    yield put({
      type: types.REGISTER_FAIL,
      payload: error.response.data.errors,
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

function* getVendor() {
  try {
    const res = yield axios.get(`${BASE_URL}/vendors/getMe`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    yield put({
      type: types.GET_VENDOR_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_VENDOR_FAIL,
      payload: error.response,
    });
  }
}

function* editVendor(action) {
  const { props } = action;
  const vendorToken = yield select(vendor);
  console.log(vendorToken)
  let dataToSend = new FormData();
  dataToSend.append("vendor_name", props.vendor_name);
  dataToSend.append("vendor_avatar", props.vendor_avatar);
  dataToSend.append("vendor_header", props.vendor_header);
  dataToSend.append("vendor_email_info", props.vendor_email);
  dataToSend.append("vendor_phone", props.vendor_phone);
  dataToSend.append("vendor_website", props.vendor_website);
  dataToSend.append("vendor_facebook", props.vendor_facebook);
  dataToSend.append("vendor_instagram", props.vendor_instagram);
  dataToSend.append("vendor_twitter", props.vendor_twitter);
  dataToSend.append("vendor_location", props.vendor_location);
  dataToSend.append("vendor_price_range", props.vendor_price_range);
  dataToSend.append("vendor_type", props.vendor_type);
  dataToSend.append("vendor_capacity", props.vendor_capacity);
  dataToSend.append("vendor_rating", props.vendor_rating);
  try {
    console.log("tokenSaga", token);
    // const res = yield axios.put(`${BASE_URL}/vendors/edit`, dataToSend, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    const res = yield axios.put(`${BASE_URL}/vendors/edit`, dataToSend, {
      headers: { Authorization: `Bearer ${vendorToken.token}` },
    });
    yield put({
      type: types.EDIT_VENDOR_SUCCESS,
      payload: res.data.newData,
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
    console.log(error.response);
    yield put({
      type: types.EDIT_VENDOR_FAIL,
      payload: error.response.data.errors,
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
    console.log(error.response);
  }
}

export function* watchLogin() {
  yield takeEvery(types.LOGIN_PENDING, vendorLogin);
}

export function* watchRegister() {
  yield takeEvery(types.REGISTER_PENDING, vendorRegister);
}

export function* watchGetVendor() {
  yield takeEvery(types.GET_VENDOR_BEGIN, getVendor);
}

export function* watcheditVendor() {
  yield takeEvery(types.EDIT_VENDOR_BEGIN, editVendor);
}
