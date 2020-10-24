import { all, fork } from "redux-saga/effects";

import * as blogSaga from "./blog";

export default function* rootSaga() {
  yield all(Object.values(blogSaga).map(item => fork(item)));
}
