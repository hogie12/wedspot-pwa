import * as types from "../const/types";

export const getQuotations = (page, limit, sort_by, order_by, filter) => {
  return {
    type: types.GET_ALL_QUOTATIONS_BEGIN,
    page,
    limit,
    sort_by,
    order_by,
    filter,
  };
};

export const getQuotationById = (id) =>{
  return {
    type:types.GET_QUOTATIONS_ID_BEGIN,
    id
  }
}

export const createQuotations = (id, file) => {
  return {
    type: types.POST_QUOTATIONS_BEGIN,
    id,
    file
  };
};
