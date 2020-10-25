
import models from '@/infra/database/mongodb/models'

import { CommentRepo } from "./impl/CommentRepo";
import { ICommentRepo } from "./impl/ICommentRepo";

const commentRepo = new CommentRepo(models);

export { commentRepo, ICommentRepo}
