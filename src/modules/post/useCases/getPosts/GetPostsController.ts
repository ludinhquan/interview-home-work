
import * as express from 'express'
import { BaseController } from "@/core/infra/BaseController";
import { DecodedExpressRequest } from "@/core/infra/DecodedRequest";

import { GetPostsUseCase } from "./GetPostsUseCase";
import { Result } from '@/core/logic/Result';
import { Post } from '../../domain/post';

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
        return this.ok(res, result.value.getValue());
      }
    } catch (err) {
      return this.fail(err)
    }
  }
}