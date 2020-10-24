import { takeLatest } from "redux-saga/effects";

import { getPostsApi } from "@/api/blog";
import { doActionGenerator } from "@/store/actions";
import { getPostsFlow } from "@/store/actions/blog";

export function* getPosts(){
    yield takeLatest(getPostsFlow.request, ({ payload: { params, callback } }) =>
    doActionGenerator({
      action: {
        query: params,
        params: params,
        callback: callback,
      },
      flow: getPostsFlow,
      apiService: getPostsApi,
    })
  );
}