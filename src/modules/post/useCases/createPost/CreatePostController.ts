
import * as express from 'express'
import { BaseController } from "@/core/infra/BaseController";
import { DecodedExpressRequest } from "@/core/infra/DecodedRequest";

import { CreatePostDTO } from "./CreatePostDTO";
import { CreatePostUseCase } from "./CreatePostUseCase";

export class CreatePostController extends BaseController {
  private useCase: CreatePostUseCase;

  constructor(useCase: CreatePostUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const createPostDto: CreatePostDTO = {
      ownerId: req.user.userId,
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
    };
    
    try {
      const result = await this.useCase.execute(createPostDto);

      if (result.isLeft()) {
        const error = result.value.errorValue();
        const message = (error.message || error) as string;
        return this.fail(message);
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(err)
    }
  }
}