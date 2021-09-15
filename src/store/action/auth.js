import * as types from "../const/types";

export const vendorLogin = (action) => {
  return {
    type: types.LOGIN_PENDING,
    action,
  };
};

export const vendorRegister = (action) => {
  return {
    type: types.REGISTER_PENDING,
    action,
  };
};

export const getVendor = () => {
  return {
    type: types.GET_VENDOR_BEGIN,
  };
};

export const editVendor = (props) => {
  return {
    type: types.EDIT_VENDOR_BEGIN,
    props,
  };
};
