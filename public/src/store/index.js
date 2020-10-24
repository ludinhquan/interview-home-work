import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";

import reducer from "@/store/reducer";

export { default as saga } from "@/store/saga";

export const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

export default store