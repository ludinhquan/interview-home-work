import { createAsyncAction } from "@/store/actions";

export const blogActionTypes = {
  getPosts: "GET_POST",
  getPostDetail: "GET_POST_DETAIL",
  getCommentByPostId: "GET_COMMENT_BY_POST",
};

export const getPostsFlow = createAsyncAction(blogActionTypes.getPosts);
export const getPostDetailFlow = createAsyncAction(blogActionTypes.getPostDetail);
export const getCommentByPostIdFlow = createAsyncAction(blogActionTypes.getCommentByPostId);
