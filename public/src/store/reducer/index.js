import { combineReducers } from "redux";

import blog from "@/store/reducer/blog";
import loading from "@/store/reducer/loading";

export default combineReducers({
  blog,
  loading,
});
