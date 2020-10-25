import { configPagination } from "@/utils/utils";
import update from "immutability-helper";
import { getCommentByPostIdFlow, getPostsFlow } from "../actions/blog";

const initialState = {
  posts: {
    list: [],
    pagination: {},
  },
};

export default function blogReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case getPostsFlow.successType:
      return update(state, {
        posts: {
          $set: {
            list: payload.posts,
            pagination: configPagination({
              total: payload.total,
              current: payload.current,
            }),
          },
        },
      });
    case getCommentByPostIdFlow.successType:
      const postId = payload._query.postId;
      const comments = payload.comments;
      const idx = state.posts.list.findIndex((item) => item.postId === postId);
      return update(state, {
        posts: {
          list: {
            [idx]: { $merge: { comments } },
          },
        },
      });
    default:
      break;
  }

  return state;
}
