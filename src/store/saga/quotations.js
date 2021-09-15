import axios from "axios";
import * as types from "../const/types";
import { BASE_URL } from "../const/server";
import { put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const vendor = state => state.vendorData

function* quotationsList(action) {
  const { page, limit, sort_by, order_by} = action;
  const token = yield select(vendor);
  try {
    const res = yield axios.get(
      `${BASE_URL}/requests/vendor?page=${page}&limit=${limit}&sort_by=${sort_by}&order_by=${order_by}`,
      { headers: { Authorization: `Bearer ${token.token}` } }
    );
    yield put({
      type: types.GET_ALL_QUOTATIONS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_ALL_QUOTATIONS_FAIL,
      payload: error.response.data.errors,
    });
  }
}

function* quotationsById(action) {
  const { id } = action;
  try {
    const res = yield axios.get(`${BASE_URL}/requests/${id}`);
    yield put({
      type: types.GET_QUOTATIONS_ID_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_QUOTATIONS_ID_FAIL,
      payload: error.response.data.errors,
    });
  }
}

function* postQuotation(action) {
  const { id, file } = action;
  const token = yield select(vendor);
  let dataToSend = new FormData();
  dataToSend.append("quotation_request_id", id);
  dataToSend.append("quotation_file", file);
  try {
    const res = yield axios.post(
      `${BASE_URL}/quotations`,
      dataToSend,
      { headers: { Authorization: `Bearer ${token.token}` } }
    );
    yield put({
      type: types.POST_QUOTATIONS_SUCCESS,
      payload: res.data.data,
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
      type: types.POST_QUOTATIONS_FAIL,
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

export function* watchAllQuotations() {
  yield takeEvery(types.GET_ALL_QUOTATIONS_BEGIN, quotationsList);
}

export function* watchQuotationsById() {
  yield takeEvery(types.GET_QUOTATIONS_ID_BEGIN, quotationsById);
}

export function* watchPostQuotation() {
  yield takeEvery(types.POST_QUOTATIONS_BEGIN, postQuotation);
}
