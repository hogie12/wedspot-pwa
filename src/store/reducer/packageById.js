import * as types from "../const/types";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  dataPackage: [],
  message: [],
  isDelete:false,
};

const packageById = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PACKAGE_ID_BEGIN:
      return {
        ...state,
        isLoading: true,
        isDelete:false
      };
    case types.GET_PACKAGE_ID_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        dataPackage: payload,
      };
    case types.GET_PACKAGE_ID_FAIL:
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: payload,
      };
    case types.DELETE_PACKAGE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case types.DELETE_PACKAGE_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        message: payload,
        isLoading: false,
        isDelete:true
      };
    case types.DELETE_PACKAGE_FAIL:
      return {
        ...state,
        isSuccess:false,
        message:payload,
        isLoading:false,
        isError:true
      };
    default:
      return state;
  }
};

export default packageById;
