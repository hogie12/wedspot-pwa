import * as types from "../const/types";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  newData: [],
  message: [],
  messageEdit:[],
  isErrorEdit:false,
};

const createPackage = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_PACKAGE_BEGIN:
      return {
        ...state,
        isLoading: true,
        isSuccess:false,
      };
    case types.CREATE_PACKAGE_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        newData: payload,
      };
    case types.CREATE_PACKAGE_FAIL:
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: payload.data.errors,
      };
    case types.EDIT_PACKAGE_BEGIN:
      return {
        ...state,
        isLoading: true,
        isSuccess:false,
      };
    case types.EDIT_PACKAGE_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        newData: payload,
      };
    case types.EDIT_PACKAGE_FAIL:
      return {
        ...state,
        isErrorEdit: true,
        isLoading: false,
        messageEdit: payload,
      };
    default:
      return state;
  }
};

export default createPackage;
