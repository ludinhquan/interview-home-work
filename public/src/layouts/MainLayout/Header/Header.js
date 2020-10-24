import React from "react";
import { Link } from "react-router-dom";
import { Col, Input, Layout, Row, Avatar } from "antd";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";

import styles from "./Header.module.less";

const HeaderDesktop = () => {
  return (
    <Layout.Header className={styles.container}>
      <Row justify="space-between">
        <Col>
          <img src={"logo"} alt="" />
          <Link to="/" className={styles.blogName}>
            Zigvy's Blog
          </Link>
        </Col>
        <Col>
          <Input
            size="large"
            className={styles.search}
            placeholder="Tìm bài viết"
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col>
          <Row gutter={24}>
            <Col>
              <Avatar
                className={styles.imageAvatar}
                size="large"
                src={"avatar"}
              />
              <span className={styles.linkItem}>
                Tùng Phan <CaretDownOutlined />
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default HeaderDesktop;
