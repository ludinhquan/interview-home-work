import axios from "axios";
import { message } from "antd";

const RestAdapter = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const handleReqConfig = (config) => config;

const handleReqError = (error) => Promise.reject(error);

const handleResSuccess = (response) => response;

const processMessage = (data) => {
  const message = data?.message;
  if (typeof message === "string") return message;
  return data?.error;
};

const handleResError = (error) => {
  const silence = error?.response?.config?.silence;
  if (silence) return Promise.reject(error);

  const statusCode = error?.response?.status;
  const data = error?.response?.data;
  const errorMessage = processMessage(data);

  if (statusCode !== 200)
    message.error(errorMessage || "Something went wrong!", {
      draggable: true,
      hideProgressBar: true,
    });
  return Promise.reject(error);
};

RestAdapter.interceptors.request.use(handleReqConfig, handleReqError);
RestAdapter.interceptors.response.use(handleResSuccess, handleResError);

export const httpGet = (url, params = {}, config = {}) =>
  RestAdapter.get(url, { params, ...config });

export const httpPost = (url, data) => RestAdapter.post(url, data);

export const httpPut = (url, data) => RestAdapter.put(url, data);

export const httpPatch = (url, data) => RestAdapter.patch(url, data);

export const httpDelete = (url, data) => RestAdapter.delete(url, data);

export default RestAdapter;
