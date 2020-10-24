import { createAsyncAction } from "@/store/actions";

export const blogActionTypes = {
  getPosts: "GET_POST",
};

export const getPostsFlow = createAsyncAction(blogActionTypes.getPosts);