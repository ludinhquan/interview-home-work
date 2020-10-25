import React, { useMemo } from "react";
import { Tag as Tagd } from "antd";
import PropTypes from "prop-types";

const TAG_COLORS = [
  "success",
  "processing",
  "error",
  "default",
  "warning",
  "pink",
  "red",
  "yellow",
  "orange",
  "cyan",
  "green",
  "blue",
  "purple",
  "geekblue",
  "magenta",
  "volcano",
  "gold",
  "lime",
];

const Tag = ({ text, color }) => {
  const random = useMemo(
    () => Math.floor(Math.random() * TAG_COLORS.length),
    []
  );
  return <Tagd color={color || TAG_COLORS[random]}>{text}</Tagd>;
};

Tag.propTypes = {};

export default Tag;
