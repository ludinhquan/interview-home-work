import { PAGE_SIZE } from "@/constants/global";

export const configPagination = ({ total, current }) => ({
  total,
  current,
  pageSize: PAGE_SIZE,
});

export const formatDate = (dateStr) => new Date(dateStr).toLocaleString();
