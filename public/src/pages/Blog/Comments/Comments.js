import React from "react";
import PropTypes from "prop-types";
import { Comment } from "antd";

const Comments = (props) => {
  const { comments } = props;
  return comments.map((comment) => (
    <Comment
      key={comment.commentId}
      author={comment.author.username}
      avatar={comment.avatar}
      content={comment.text}
      datetime={comment.createdAt}
    />
  ));
};

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
