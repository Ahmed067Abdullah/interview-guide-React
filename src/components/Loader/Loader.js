import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import colors from "../../utils/colors";

const Loader = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    text-align: center;
    border-color: ${colors.primay};
  `;
  return (
    <BeatLoader
      css={override}
      sizeUnit={"px"}
      size={15}
      color={"#123abc"}
      loading={true}
    />
  );
};

export default Loader;
