import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const MainLayout = React.lazy(() => import("@/layouts/MainLayout"));
const Blog = React.lazy(() => import("./Blog"));

const Pages = () => (
  <MainLayout>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/blog" />} />
      <Route path="/blog" component={Blog} />
    </Switch>
  </MainLayout>
);

export default Pages;
