import * as express from 'express'
import { BaseController } from "@/core/infra/BaseController";

import { GetPostResDTO } from "./GetPostResDTO";
import { GetPostsUseCase } from "./GetPostsUseCase";
import { PostDetailsMap } from '../../mappers/postDetailsMap';
import { GetPostReqDTO } from './GetPostReqDTO';

export class GetPostsController extends BaseController {
  private useCase: GetPostsUseCase;

  constructor(useCase: GetPostsUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    try {
      const reqDto: GetPostReqDTO = {
        title: req.query.title as string,
        limit: Number(req.query.limit),
        current: Number(req.query.current) || 1,
      }

      const result = await this.useCase.execute(reqDto);
      if (result.isLeft()) {
        const error = result.value.errorValue();
        const message = (error.message || error) as string;
        return this.fail(message);
      } else {
        const { posts, total, current } = result.value.getValue();
        return this.ok<GetPostResDTO>(res, {
          total,
          current,
          posts: posts.map(p => PostDetailsMap.toDTO(p)),
        });
      }
    } catch (err) {
      return this.fail(err)
    }
  }
}