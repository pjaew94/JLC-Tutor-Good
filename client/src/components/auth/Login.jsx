import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from '../../actions/auth';

import "../styles/Login.scss";
import sittingSvg from "../../svgs/Group 2.svg";
import floatingSvg from "../../svgs/Group 4.svg";
import blob1Svg from "../../svgs/blobs/Blob1.svg";
import blob2Svg from "../../svgs/blobs/Blob2.svg";
import blob3Svg from "../../svgs/blobs/Blob3.svg";
import blob4Svg from "../../svgs/blobs/Blob4.svg";

import { IconContext } from "react-icons";
import { CgShapeHexagon } from "react-icons/cg";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password)
  };

  if(isAuthenticated) {
      return <Redirect to='/courses' />
  }

  return (
    <div className="login">
      <div className="background">
        <div className="backdrop">
          <img className="floating_svg" src={floatingSvg} alt="" />
          <img className="sitting_svg" src={sittingSvg} alt="" />
          <img className="blob1" src={blob1Svg} alt="" />
          <img className="blob2" src={blob2Svg} alt="" />
          <img className="blob3" src={blob3Svg} alt="" />
          <img className="blob4" src={blob4Svg} alt="" />
        </div>
      </div>

      <div className="login_content">
        <div className="logo">
          <IconContext.Provider value={{ className: "hexagon" }}>
            <CgShapeHexagon />
          </IconContext.Provider>
          <span>JLC Studies</span>
        </div>

        <form className="login_form" onSubmit={(e) => onSubmit(e)}>
          <div className="input_wrapper">
            <div className="form_group">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form_group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="button_container">
            <input className="button" type="submit" value="Login" />
          </div>
          <div className='route_to_register'>
              Don't have an account? <Link className="small_link" to="/register">
                Register
              </Link> now!
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
