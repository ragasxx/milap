import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div style={style}>
      <PuffLoader />
    </div>
  );
};

export default Loader;
