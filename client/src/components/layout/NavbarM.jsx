import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import { IconContext } from "react-icons";
import { CgArrowRight } from "react-icons/cg";
import {
  AiOutlineUser,
  AiOutlineBuild,
  AiOutlineSolution,
  AiOutlineLogout,
} from "react-icons/ai";

import "../styles/NavbarM.scss";

const NavbarM = ({
  logout,
  auth: { isAuthenticated, loading, user },
  navbarM: { show },
}) => {
  const [navState, setNavState] = useState("courses");
  const [showNav, setShowNav] = useState(false);

  const setNav = (e) => {
    setNavState(e.target.name);
    setShowNav(false);
  };

  return (
    <Fragment>
      {show && (
        <div className="icon_container">

            <div
              className={`hamburger ${showNav && "hide_hamburger"}`}
              onClick={() => {
                setShowNav(true);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div
              className={`arrow_icon_container ${showNav && "show_arrow"}`}
              onClick={() => {
                setShowNav(false);
              }}
            >
              <IconContext.Provider value={{ className: "icon" }}>
                <CgArrowRight />
              </IconContext.Provider>
            </div>

        </div>
      )}
      {!loading & isAuthenticated ? (
        <nav
          className={`navbarM-container ${showNav && "show_nav"}`}
          onClick={() => {
            setShowNav(false);
          }}
        >
          <ul className="navbarM">
            <li>
              <Link
                className={`link ${navState === "profile" ? "selected" : null}`}
                to="/profile"
                name="profile"
                onClick={setNav}
              >
                <IconContext.Provider value={{ className: "icon" }}>
                  <AiOutlineUser />
                </IconContext.Provider>
                Profile
              </Link>
            </li>
            <li>
              <Link
                className={`link ${navState === "courses" ? "selected" : null}`}
                to="/courses"
                name="courses"
                onClick={setNav}
              >
                <IconContext.Provider value={{ className: "icon" }}>
                  <AiOutlineBuild />
                </IconContext.Provider>
                Courses
              </Link>
            </li>
            <li>
              <Link
                className={`link ${
                  navState === "teachers" ? "selected" : null
                }`}
                to="/teachers"
                name="teachers"
                onClick={setNav}
              >
                <IconContext.Provider value={{ className: "icon" }}>
                  <AiOutlineSolution />
                </IconContext.Provider>
                Teachers
              </Link>
            </li>
            {!loading && user !== null && user.status === "Admin" ? (
              <li>
                <Link
                  className={`link ${
                    navState === "registerNew" ? "selected" : null
                  }`}
                  to="/register"
                  name="registerNew"
                  onClick={setNav}
                >
                  Register New
                </Link>
              </li>
            ) : null}
          </ul>

          <a className="logout_link" href="/" onClick={logout}>
            <IconContext.Provider value={{ className: "icon" }}>
              <AiOutlineLogout />
            </IconContext.Provider>
            Log Out
          </a>
        </nav>
      ) : null}
    </Fragment>
  );
};

NavbarM.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  navbarM: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  navbarM: state.navbarM,
});

export default connect(mapStateToProps, { logout })(NavbarM);
