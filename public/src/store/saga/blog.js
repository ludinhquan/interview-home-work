import { takeLatest } from "redux-saga/effects";

import { PAGE_SIZE } from "@/constants/global";
import { doActionGenerator } from "@/store/actions";
import { getPostsApi, getCommentByPostIdApi } from "@/api/blog";
import { getCommentByPostIdFlow, getPostsFlow } from "@/store/actions/blog";

export function* getPosts() {
  yield takeLatest(getPostsFlow.request, ({ payload: { query } = {} }) =>
    doActionGenerator({
      action: {
        query: { ...query, limit: PAGE_SIZE },
      },
      flow: getPostsFlow,
      apiService: getPostsApi,
    })
  );
}

export function* getCommentByPostId() {
  yield takeLatest(getCommentByPostIdFlow.request, ({ payload: { query } = {} }) =>
    doActionGenerator({
      action: {
        query
      },
      flow: getCommentByPostIdFlow,
      apiService: getCommentByPostIdApi,
    })
  );
}
