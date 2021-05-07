import { Dimensions } from "react-native";
// @ts-ignore
import _ from "lodash";

const { width, height } = Dimensions.get("window");

const vh = height / 100;
const vw = width / 100;

export const sizeWidth = (size) => {
  return _.floor(size * vw);
};

export const sizeHeight = (size) => {
  return _.floor(size * vh);
};

export const sizeFont = (size) => {
  return _.floor(size * vw);
};