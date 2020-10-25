import { configPagination } from "@/utils/utils";
import update from "immutability-helper";
import { getPostsFlow } from "../actions/blog";

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
    default:
      break;
  }

  return state;
}
