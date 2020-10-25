import { httpGet } from "@/utils/request";

export const getPostsApi = (params) => httpGet("/posts", params);
export const getCommentByPostIdApi = (params) => httpGet("/comments", params);
