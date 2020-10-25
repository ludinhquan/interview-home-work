
import * as express from 'express'
import { BaseController } from "@/core/infra/BaseController";

import { GetCommentByPost } from './GetCommentByPost';
import { GetCommentByPostErrors } from "./GetCommentByPostErrors";
import { CommentDetailsMap } from '../../mappers/commentDetailsMap';

export class GetCommentByPostController extends BaseController {
  private useCase: GetCommentByPost;

  constructor(useCase: GetCommentByPost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    try {
      const dto = {
        postId: req.query.postId
      }
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value.errorValue();
        const message = (error.message || error) as string;

        switch (error.constructor) {
          case GetCommentByPostErrors.PostNotFoundError:
            return this.notFound(message)
          default:
            return this.fail(message);
        }

      } else {
        const comments = result.value.getValue();
        return this.ok(res, { comments: comments.map(c => CommentDetailsMap.toDTO(c)) });
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}