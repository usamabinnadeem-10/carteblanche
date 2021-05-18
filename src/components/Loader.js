import React, { useState } from "react";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #26a69a;
`;

function Loader({ active }) {
  let [loading, setLoading] = useState(active);
  let [color, setColor] = useState("#26a69a");

  return (
    <div className="sweet-loading">
      <HashLoader
        color={color}
        loading={loading}
        css={override}
        size={30}
        height={10}
      />
    </div>
  );
}

export default Loader;
