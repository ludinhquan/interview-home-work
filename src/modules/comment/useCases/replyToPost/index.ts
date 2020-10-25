import { postRepo } from "@/modules/post/repos";
import { commentRepo } from "@/modules/comment/repos";

import { ReplyToPost } from "./ReplyToPost";
import { ReplyToPostController } from "./ReplyToPostController";

const replyToPost = new ReplyToPost(commentRepo, postRepo);

const replyToPostController = new ReplyToPostController(replyToPost)

export {
  replyToPost,
  replyToPostController
}
