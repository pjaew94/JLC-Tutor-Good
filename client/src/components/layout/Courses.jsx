import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllSubjects } from "../../actions/subjects";
import { getSubjectPosts, removeSubjectPosts } from "../../actions/posts";

import { BiBookHeart, BiBookContent, BiCalculator } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { IconContext } from "react-icons";

import "../styles/Courses.scss";


const Courses = ({
  getAllSubjects,
  getSubjectPosts,
  removeSubjectPosts,
  posts,
  auth: { user },
  subjects: { subjects, loading },
}) => {
  useEffect(() => {
    getAllSubjects(user);

    return function cleanup() {
      removeSubjectPosts();
    };
  }, [getAllSubjects, removeSubjectPosts, user]);

  const [currentSubject, setCurrentSubject] = useState("");

  // Create new array of subjects to display
  let coursesSubjects = [];
  if (subjects && !loading && user) {
    coursesSubjects = subjects.filter(function (e) {
      if (user.status === "Admin" || user.status === "Instructor") {
        return e.instructorSubjects === user.instructorSubjects;
      } else {
        return e.studentSubjects === user.studentSubjects;
      }
    });
  }


  const getIcon = (subject) => {
    if (subject === "bookClub") {
      return <BiBookHeart />;
    } else if (subject === "english") {
      return <BiBookContent />;
    } else if (subject === "math") {
      return <BiCalculator />;
    }
  };

  const callPost = (subjectId) => {
    getSubjectPosts(subjectId);
    setCurrentSubject(subjectId);
  };



  return loading && subjects === null && posts === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="courses_container">
        <div className="courses">
          <div className="inner">
            {coursesSubjects &&
              coursesSubjects.map((s) => {
                return (
                  <div className="course_card" key={s._id}>
                    <div className="icon_button_container">
                      <div className={`icon_container ${s.instructorSubjects}`}>
                        <IconContext.Provider value={{ className: "icon" }}>
                          {getIcon(s.instructorSubjects)}
                        </IconContext.Provider>
                      </div>
                      <Link
                        className="button_container"
                        to={`/courses/${s.subjectId}`}
                      >
                        <button
                          className={"course_button"}
                          onClick={() => callPost(s.subjectId)}
                        >
                          <IconContext.Provider
                            value={{
                              className: `icon ${
                                currentSubject === s.subjectId
                                  ? "current_icon"
                                  : null
                              }`,
                            }}
                          >
                            <BsArrowRight />
                          </IconContext.Provider>
                          <h3
                            className={
                              currentSubject === s.subjectId
                                ? "current_text"
                                : null
                            }
                          >
                            Current
                          </h3>
                        </button>
                      </Link>
                    </div>
                    <h3 className="instructor">
                      {s.instructorLast}, {s.instructorFirst}
                    </h3>
                    <h2 className="title">{s.subject}</h2>
                    <h3 className="time">
                      {s.startTime} - {s.endTime}
                    </h3>
                    <h3 className="info">{s.description}</h3>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* {isMobile && mobileBackButton} */}
    </Fragment>
  );
};

Courses.propTypes = {
  getAllSubjects: PropTypes.func.isRequired,
  getSubjectPosts: PropTypes.func.isRequired,
  removeSubjectPosts: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  subjects: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  subjects: state.subjects,
  posts: state.posts,
});

export default connect(mapStateToProps, {
  getAllSubjects,
  getSubjectPosts,
  removeSubjectPosts,
})(Courses);
