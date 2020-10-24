import { postRepo } from "@/modules/post/repos";

import { GetPostsUseCase } from "./GetPostsUseCase";
import { GetPostsController } from "./GetPostsController";

const getPostsUseCase = new GetPostsUseCase(postRepo);
const getPostsController = new GetPostsController(getPostsUseCase);

export { getPostsController }