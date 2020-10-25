
import * as express from 'express'
import { BaseController } from "@/core/infra/BaseController";
import { DecodedExpressRequest } from "@/core/infra/DecodedRequest";

import { ReplyToPostDTO } from "./ReplyToPostDTO";
import { ReplyToPostErrors } from "./ReplyToPostErrors";
import { ReplyToPost } from "./ReplyToPost";
import { CommentDTO } from '../../dtos/commentDTO';

export class ReplyToPostController extends BaseController {
  private useCase: ReplyToPost;

  constructor(useCase: ReplyToPost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto: ReplyToPostDTO = {
      author: req.user,
      comment: req.body.comment,
      postId: req.body.postId,
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value.errorValue();
        const message = (error.message || error) as string;

        switch (error.constructor) {
          case ReplyToPostErrors.PostNotFoundError:
            return this.notFound(message)
          default:
            return this.fail(message);
        }

      } else {
        return this.ok<{ comment: CommentDTO }>(res, { comment: result.value.getValue() });
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}