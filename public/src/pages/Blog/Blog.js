import React, { useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPostsFlow, blogActionTypes } from "@/store/actions/blog";

import useLoading from "@/hooks/useLoading";
import { getPostsSelector } from "@/store/selector/blog";

import styles from "./Blog.module.less";
import BlogItem from "./BlogItem";

const Blog = () => {
  const dispatch = useDispatch();
  const isLoading = useLoading(blogActionTypes.getPosts);
  const posts = useSelector(getPostsSelector);

  useEffect(() => {
    dispatch(getPostsFlow.request({}));
  }, [dispatch]);

  return (
    <div className={styles.blog}>
      {isLoading && <Spin size="large" className={styles.loading} />}
      
      {(posts.list || []).map((post) => (
        <BlogItem key={post._id} {...post} />
      ))}
    </div>
  );
};

Blog.propTypes = {};

export default Blog;
