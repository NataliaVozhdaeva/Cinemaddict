import { generateComment } from "../mock/comment";

export default class CommentsModel {
  comments = Array.from({ length: 9 }, generateComment);

  getComment = () => this.comments;
}
