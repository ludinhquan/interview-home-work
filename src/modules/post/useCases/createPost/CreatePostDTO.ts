export interface CreatePostDTO {
  ownerId: string,
  title: string;
  content: string;
  tags: Array<string>
}