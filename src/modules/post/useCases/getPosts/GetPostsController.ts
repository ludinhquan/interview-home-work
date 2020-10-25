import * as express from 'express'
import { BaseController } from "@/core/infra/BaseController";

import { GetPostResDTO } from "./GetPostResDTO";
import { GetPostsUseCase } from "./GetPostsUseCase";
import { PostMap } from '../../mappers/postMap';
import { PostDetailsMap } from '../../mappers/postDetailsMap';

export class GetPostsController extends BaseController {
  private useCase: GetPostsUseCase;

  constructor(useCase: GetPostsUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(_, res: express.Response): Promise<any> {
    try {
      const result = await this.useCase.execute();
      if (result.isLeft()) {
        const error = result.value.errorValue();
        const message = (error.message || error) as string;
        return this.fail(message);
      } else {
        const posts = result.value.getValue();
        return this.ok<GetPostResDTO>(res, {
          posts: posts.map(p => PostDetailsMap.toDTO(p))
        });
      }
    } catch (err) {
      return this.fail(err)
    }
  }
}