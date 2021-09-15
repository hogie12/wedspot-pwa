import * as types from "../const/types";

const token = localStorage.getItem("token");

const initialState = {
  isLoading: false,
  isSuccess: false,
  isChange:false,
  isError: false,
  data: [],
  message: [],
  token: []
};

const vendorData = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        data: payload.currentVendor,
        token:payload.token
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: payload,
      };
    case types.REGISTER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        data: payload.data,
        token:payload.token
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: payload,
      };
    case types.GET_VENDOR_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        data: payload.data,
        token:token
      };
    case types.GET_VENDOR_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_VENDOR_FAIL:
      return {
        ...state,
        isLoading: false,
        message: payload,
      };
    case types.EDIT_VENDOR_BEGIN:
      return {
        ...state,
        isLoading: true,
        isChange:false
      };
    case types.EDIT_VENDOR_SUCCESS:
      return {
        ...state,
        isChange: true,
        isLoading: false,
        data: payload,
        message:[]
      };
    case types.EDIT_VENDOR_FAIL:
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: payload,
        isChange:false,
      };

    default:
      return state;
  }
};

export default vendorData;
