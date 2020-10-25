import React from "react";
import { Col, Collapse, Row, Typography } from "antd";
import PropTypes from "prop-types";

import Tag from "@/components/Tag";

import styles from "./BlogItem.module.less";
import { useHistory } from "react-router-dom";
import Comments from "../Comments";

const { Panel } = Collapse;
const { Paragraph } = Typography;

const BlogItem = (props) => {
  const { post } = props;
  const history = useHistory();
  const getPostDetail = () => history.push(`/post/${post.postId}`);

  return (
    <div className={styles.blogItem}>
      <div className={styles.title} onClick={getPostDetail}>
        {post.title}
      </div>
      <Row justify="space-between">
        <Col className={styles.info}>
          <div>Author: {post.author?.username}</div>
          <div>Created at: {post.createdAt.toString()}</div>
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
