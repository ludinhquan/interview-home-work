import { postRepo } from "@/modules/post/repos";

import { CreatePostUseCase } from "./CreatePostUseCase";
import { CreatePostController } from "./CreatePostController";

const createPostUseCase = new CreatePostUseCase(postRepo);
const createPostController = new CreatePostController(createPostUseCase);

export { createPostController }