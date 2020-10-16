import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { loadUser, register } from "../../actions/auth";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

import "../styles/Register.scss";

import registerSvg from "../../svgs/GirlSwing.svg";
import axios from "axios";

const Register = ({
  setAlert,
  register,
  auth: { user, loading, isAuthenticated },
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    status: "",
    studentSubjects: "",
    instructorSubjects: "",
  });

  // Destructure state
  const {
    name,
    email,
    password,
    password2,
    status,
    studentSubjects,
    instructorSubjects,
  } = formData;

  // Change handler
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Register Instructor/Student
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Please make sure your passwords are matching.", "danger", 2000);
    }  else {
      if (user && user.status === "Admin") {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify({
          name,
          email,
          password,
          status,
          studentSubjects,
          instructorSubjects,
        });

        try {
          await axios.post("/api/users", body, config);

          setAlert("User successfully registered.", "green", 3000);
        } catch (err) {
          console.error(err.message);
        }
        // register({ name, email, password, status });
      } else if(!studentSubjects) {
     
          setAlert("Please select the subjects you are taking", "danger", 2000);
        
      }
      else {

        const status = "Student";

        register({
          name,
          email,
          password,
          status,
          studentSubjects,
          instructorSubjects,
        });
      }
    }
  };

  // Dynamic Selectors
  const statusSelector = (
    <div className="select_container">
      <select
        value={status}
        name="status"
        default="Student"
        onChange={(e) => onChange(e)}
        defaultValue=""
      >
        <option disabled={true} value="">
          Student or Teacher?
        </option>
        <option value="Student">Student</option>
        <option value="Instructor">Instructor</option>
      </select>
      <h3 className="warning">
        Please be sure to select "Student" if you are registering for a student
      </h3>
    </div>
  );
  const studentSubjectsSelector = (
    <div className="select_container">
      <select
        value={studentSubjects}
        name="studentSubjects"
        onChange={(e) => onChange(e)}
        defaultValue=""
      >
        <option disabled={true} value="">
          Select your courses
        </option>
        <option value="sat">SAT Classes</option>
        <option value="pbC">PreAlg & Book Club</option>
        <option value="abC">Algebra & Book Club</option>
      </select>
    </div>
  );
  const instructorSubjectsSelector = (
    <div className="select_container">
      <select
        value={instructorSubjects}
        name="instructorSubjects"
        onChange={(e) => onChange(e)}
        defaultValue=""
      >
        <option disabled={true} value="">
          Select your subjects
        </option>
        <option value="math">Math</option>
        <option value="bookClub">Book Club</option>
        <option value="english">SAT English</option>
      </select>
    </div>
  );

  // Conditions to load register page
  if (!loading && user !== null) {
    if (user.status !== "Admin" && isAuthenticated) {
      return <Redirect to="/courses" />;
    } else if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
  }

  return loading && user === null ? (
    <Spinner />
  ) : (
    <div className="admin_register">
      <div className="container">
        <div className="form_container">
          <div className="header_container">
            <div className="header">Register New Account</div>
          </div>
          <form className="admin_form" onSubmit={(e) => onSubmit(e)}>
            <div className="inner">
              <div className="form_upper">
                <div className="form_group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form_group">
                  <input
                    type="text"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className="form_lower">
                <div className="form_group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form_group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              {user !== null && user.status === "Admin" && isAuthenticated
                ? statusSelector
                : null}
              {formData.status === "Student" || !isAuthenticated
                ? studentSubjectsSelector
                : null}
              {formData.status === "Instructor" && instructorSubjectsSelector}
            </div>
            <input className="button" type="submit" value="Register" />
            <div className="redirect_login">
              Already have an account?{" "}
              <Link className="small_link" to="/login">
                Sign In
              </Link>
            </div>
          </form>
        </div>

        <div className="svg_container">
          <img src={registerSvg} alt=""></img>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, loadUser, register })(
  Register
);
