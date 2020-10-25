import { takeLatest } from "redux-saga/effects";

import { getPostsApi } from "@/api/blog";
import { doActionGenerator } from "@/store/actions";
import { getPostsFlow } from "@/store/actions/blog";
import { PAGE_SIZE } from "@/constants/global";

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
