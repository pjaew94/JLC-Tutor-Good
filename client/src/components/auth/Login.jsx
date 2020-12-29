import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

import "../styles/Login.scss";

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
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/courses" />;
  }

  return (
    <div className="login">
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
          <div className="route_to_register">
            Don't have an account?{" "}
            <Link className="small_link" to="/register">
              Register
            </Link>{" "}
            now!
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
