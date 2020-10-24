
import { Mapper } from "@/core/infra/Mapper";

import { Post } from "../domain/post";

export class PostMap implements Mapper<Post> {

  public static toPersistence (post: Post): any {
    return {
      tags: post.tags,
      title: post.title.value,
      content: post.content.value,
      ownerId: post.ownerId.id.toString(),
      createdAt: new Date().toString(),
    }
  }
}