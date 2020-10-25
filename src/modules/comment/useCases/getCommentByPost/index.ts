import { commentRepo } from "@/modules/comment/repos";

import { GetCommentByPost } from "./GetCommentByPost";
import { GetCommentByPostController } from "./GetCommentByPostController";

const getCommentByPost = new GetCommentByPost(commentRepo);

const getCommentByPostController = new GetCommentByPostController(getCommentByPost)

export {
  getCommentByPost,
  getCommentByPostController
}
