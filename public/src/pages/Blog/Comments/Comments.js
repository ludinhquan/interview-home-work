import React from "react";
import PropTypes from "prop-types";
import { Comment } from "antd";
import { formatDate } from "@/utils/utils";

const Comments = (props) => {
  const { comments } = props;
  return comments.map((comment) => (
    <Comment
      key={comment.commentId}
      author={comment.author.username}
      avatar={comment.avatar}
      content={comment.text}
      datetime={formatDate(comment.createdAt)}
    />
  ));
};

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
