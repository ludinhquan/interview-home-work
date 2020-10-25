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
  // const posts = useSelector(getPostsSelector);
  const posts = {
    list: [
      {
        id: 1,
        title: "post title",
        content: "content",
        createdAt: new Date(),
        author: {
          name: "name",
        },
        tags: ["blue", "red"],
        content:
          "Though the tools we use to build client-side web apps have changed substantially over the years, the fundamental principles behind designing robust software have remained relatively the same. In this guide, we go back to basics and discuss a better way to think about the front-end architecture using modern tools like React, Redux, xState, and Apollo Client.",
        commentCount: 2,
        comments: [
          {
            id: 1,
            actions: [<span key="comment-list-reply-to-0">Reply to</span>],
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: (
              <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </p>
            ),
            // datetime: ,
          },
        ],
      },
      {
        id: 2,
        title: "post title 2",
        content: "content",
        createdAt: new Date(),
        author: {
          name: "name",
        },
        tags: ["blue", "red"],
        content:
          "Though the tools we use to build client-side web apps have changed substantially over the years, the fundamental principles behind designing robust software have remained relatively the same. In this guide, we go back to basics and discuss a better way to think about the front-end architecture using modern tools like React, Redux, xState, and Apollo Client.",
        commentCount: 2,
      },
      {
        id: 3,
        title: "post title 3",
        content: "content",
        createdAt: new Date(),
        author: {
          name: "name",
        },
        tags: ["blue", "red"],
        content:
          "Though the tools we use to build client-side web apps have changed substantially over the years, the fundamental principles behind designing robust software have remained relatively the same. In this guide, we go back to basics and discuss a better way to think about the front-end architecture using modern tools like React, Redux, xState, and Apollo Client.",
        commentCount: 2,
      },
    ],
  };

  useEffect(() => {
    dispatch(getPostsFlow.request({}));
  }, [dispatch]);

  return (
    <div className={styles.blog}>
      {isLoading && <Spin size="large" className={styles.loading} />}
      <div className={styles.container}>
        {(posts.list || []).map((post) => (
          <BlogItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

Blog.propTypes = {};

export default Blog;
