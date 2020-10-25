import React, { useEffect, useState } from "react";
import { Col, Input, Pagination, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

import useLoading from "@/hooks/useLoading";
import { INPUT_DELAY } from "@/constants/global";
import { getPostsSelector } from "@/store/selector/blog";
import { getPostsFlow, blogActionTypes } from "@/store/actions/blog";

import BlogItem from "./BlogItem";
import styles from "./Blog.module.less";

let timeOut = null;

const Blog = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const isLoading = useLoading([blogActionTypes.getPosts]);
  const posts = useSelector(getPostsSelector);

  useEffect(() => {
    dispatch(getPostsFlow.request());
  }, [dispatch]);

  const onSearchPost = (e) => {
    setFilter(e.target.value);
    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      dispatch(getPostsFlow.request({ query: { title: e.target.value } }));
    }, INPUT_DELAY);
  };

  const onPagination = (page) => {
    dispatch(getPostsFlow.request({ query: { title: filter, current: page } }));
  };

  return (
    <div className={styles.blog}>
      {isLoading && <Spin size="large" className={styles.loading} />}
      <div className={styles.container}>
        <Row justify="end" className={styles.search}>
          <Col span={12}>
            <Input
              onChange={onSearchPost}
              size="large"
              className={styles.searchInput}
              placeholder="Tìm bài viết"
              prefix={<SearchOutlined />}
            />
          </Col>
        </Row>
        {(posts.list || []).map((post) => (
          <BlogItem key={post.postId} post={post} />
        ))}
        <Row justify="end">
          <Col>
            <Pagination onChange={onPagination} {...posts.pagination} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

Blog.propTypes = {};

export default Blog;
