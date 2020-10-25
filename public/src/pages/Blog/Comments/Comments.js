import React from "react";
import PropTypes from "prop-types";
import { Comment } from "antd";

const Comments = (props) => {
  const { comments } = props;
  return comments.map((comment) => (
    <Comment
      key={comment.id}
      actions={comment.actions}
      author={comment.author}
      avatar={comment.avatar}
      content={comment.content}
      datetime={comment.datetime}
    />
  ));
};

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
