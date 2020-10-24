import update from "immutability-helper";
import { getPostsFlow } from "../actions/blog";

const initialState = {
  posts: {
    list: [],
    pagination: {},
  },
};

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case getPostsFlow.successType:
      return update(state, {
        posts: { $set: { list: action.payload, pagination: {} } },
      });
    default:
      break;
  }

  return state;
}
