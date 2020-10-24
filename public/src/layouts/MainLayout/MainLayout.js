import { Layout, Spin } from "antd";
import { useMedia } from "react-media";
import React, { Suspense, useState } from "react";

import Header from "./Header";

import styles from "./MainLayout.module.less";

const { Content } = Layout;

const Loading = () => (
  <div className={styles.loading}>
    <Spin size="large" />
  </div>
);

const MainLayout = ({ children }) => {
  const isMobile = useMedia({ query: "(max-width: 1033px)" });
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  return (
    <Layout className={styles.container}>
      <Header
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        setIsCollapsed={setIsCollapsed}
      />
      <Layout>
        <Content className={styles.content}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
