import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Collapse, Row, Typography } from "antd";

import Tag from "@/components/Tag";
import { formatDate } from "@/utils/utils";
import { getCommentByPostIdFlow } from "@/store/actions/blog";

import Comments from "../Comments";
import styles from "./BlogItem.module.less";

const { Panel } = Collapse;
const { Paragraph } = Typography;

const BlogItem = (props) => {
  const { post } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const getPostDetail = () => history.push(`/post/${post.postId}`);

  const onFetchComment = (keys) => {
    if (keys.length === 0) return;
    if ((post.comments || []).length > 0) return;
    dispatch(
      getCommentByPostIdFlow.request({ query: { postId: post.postId } })
    );
  };

  return (
    <div className={styles.blogItem}>
      <div className={styles.title} onClick={getPostDetail}>
        {post.title}
      </div>
      <Row justify="space-between">
        <Col className={styles.info}>
          <div>Author: {post.author?.username}</div>
          <div>Created at: {formatDate(post.createdAt)}</div>
        </Col>
        <Col>
          {(post.tags || []).map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </Col>
      </Row>
      <Paragraph
        ellipsis={{
          rows: 1,
          expandable: true,
          symbol: "detail",
          onExpand: getPostDetail,
        }}
      >
        {post.content}
      </Paragraph>
      <div className={styles.comment}>
        <div className={styles.commentCount}></div>
        <Collapse
          bordered={false}
          expandIconPosition="right"
          onChange={onFetchComment}
        >
          <Panel key="1" header={`${post.numComments} replies`}>
            <Comments comments={post.comments || []} />
          </Panel>
        </Collapse>
        ,
      </div>
    </div>
  );
};

BlogItem.propTypes = {
  post: PropTypes.object,
};

export default BlogItem;
