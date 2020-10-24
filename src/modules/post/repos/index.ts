
import models from '@/infra/database/mongodb/models'

import { PostRepo } from "./impl/PostRepo";

const postRepo = new PostRepo(models);

export { postRepo }
