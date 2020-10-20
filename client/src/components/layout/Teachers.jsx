import React from "react";
import PropTypes from "prop-types";

import "../styles/Teachers.scss";
import icecreamSvg from "../../svgs/icecreamSvg.svg";

const Teachers = () => {
  return (
    <div className="teachers_container">
      <div className="inner_container">
        <img src={icecreamSvg} alt="icecream"></img>
        <h1>Sorry about that! Content coming soon!</h1>
      </div>
    </div>
  );
};

export default Teachers;
