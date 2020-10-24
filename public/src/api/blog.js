import { httpGet } from "@/utils/request";

export const getPostsApi = (params) => httpGet("/posts", params);
