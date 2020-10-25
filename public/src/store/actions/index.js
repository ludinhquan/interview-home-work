import { call, put } from "redux-saga/effects";
import { createAction } from "redux-actions";

export const createAsyncAction = (actionType) => {
  const request = `${actionType}_REQUEST`;
  const success = `${actionType}_SUCCESS`;
  const failure = `${actionType}_FAILURE`;
  return {
    request: createAction(request),
    success: createAction(success),
    failure: createAction(failure),
    requestType: request,
    successType: success,
    failureType: failure,
  };
};

export function* doActionGenerator({ apiService, action, flow }) {
  const { query, params, callback, config } = action;
  try {
    const response = yield call(apiService, query, params, config);
    const { data } = response;
    if (!data || response.error) {
      yield put(flow.failure(response.error || null));
      executeCallback(callback, true, response.error);
      return;
    }
    yield put(flow.success({ ...data, _query: query, _params: params }));
    executeCallback(callback, false, { data, query, params });
  } catch (error) {
    yield put(flow.failure(error));
    executeCallback(callback, true, error);
  }
}

const executeCallback = (callback, isError, params) => {
  if (typeof callback === "function") callback(isError, params);
};
