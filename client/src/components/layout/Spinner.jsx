import React from "react";
import spinner from "./Spinner.gif";

export default () => {
  return (
    <div style={{height: "90vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
