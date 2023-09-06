/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import Loading from "react-loading-overlay";
import { HashLoader } from "react-spinners";
import "./LoadingOverlay.css";

const LoadingOverlay = ({ active, children }) => {
  const COLORS = {
    PRIMARY: "#0F15A2",
  };
  return (
    <Loading active={active} spinner={<HashLoader color={COLORS.PRIMARY} />}>
      {children}
    </Loading>
  );
};

export default LoadingOverlay;
