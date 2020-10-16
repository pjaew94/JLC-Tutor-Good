import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllSubjects } from "../../actions/subjects";
import { getSubjectPosts, removeSubjectPosts } from "../../actions/posts";
import { useMediaQuery } from "react-responsive";

import { BiBookHeart, BiBookContent, BiCalculator } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IconContext } from "react-icons";

import "../styles/Courses.scss";
import coffeeGif from "../../svgs/coffee.gif";

import Posts from "./Posts/Posts";
import PostForm from "./Posts/PostForm";

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
  }, []);

  const [currentSubject, setCurrentSubject] = useState("");
  const [slideToPosts, setSlideToPosts] = useState(false);

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

  // Pulls out the posts and sorts by date. --- Quality: Get exact seconds when updated and sort by seconds instead of date.
  const subjectPosts = posts.posts;
  let arrangedSubjects = [];
  if (subjectPosts) {
    arrangedSubjects = subjectPosts.sort(function (x, y) {
      return y.due.replace(/-/g, "") - x.due.replace(/-/g, "");
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

  const noPost = (
    <div className="no_post_container">
      <img src={coffeeGif} alt="Coffee Guy"></img>
      <h1>Select one of the subjects to see the contents!</h1>
    </div>
  );

  const callPost = (subjectId) => {
    getSubjectPosts(subjectId);
    setCurrentSubject(subjectId);
    setSlideToPosts(true);
  };

  const mobilePostBack = () => {
    setSlideToPosts(false);
    setCurrentSubject("");
  };

  // MediaQuery
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });

  // check if user is instructor or admin to show postForm
  let postForm = null;
  if (user) {
    postForm =
      user.status === "Instructor" || user.status === "Admin" ? (
        <PostForm subjectId={posts.subject} />
      ) : null;
  }

  const mobileBackButton = (
    <div className={`posts_back_button_mobile ${slideToPosts && "show_mobile_back_button"}`} onClick={mobilePostBack}>
      <IconContext.Provider value={{ className: "icon" }}>
        <RiArrowGoBackLine />
      </IconContext.Provider>
      <h3>Back</h3>
    </div>
  );

  return loading && subjects === null && posts === null ? (
    <Spinner />
  ) : (
    <Fragment >
    <div className="courses_container">
      <div className={`courses ${slideToPosts && "courses_slide"}`}>
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
                    <div className="button_container">
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
                    </div>
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

      <div className={`posts_container ${slideToPosts && "posts_slide"}`}>
        <div className="inner">
          {subjectPosts && postForm }
          {arrangedSubjects.length > 0
            ? arrangedSubjects.map((post) => {
                return (
                  <Posts
                    postId={post._id}
                    postUserId={post.user}
                    name={post.name}
                    homework={post.homework}
                    due={post.due}
                    date={post.date}
                    likes={post.likes}
                    comments={post.comments}
                    key={post._id}
                    userId={user._id}
                    subject={currentSubject}
                    userStatus={user.status}
                  />
                );
              })
            : noPost}
        </div>
      </div>
    </div>
    {isMobile && mobileBackButton}
    </Fragment>
  );
};

Courses.propTypes = {
  getAllSubjects: PropTypes.func.isRequired,
  getSubjectPosts: PropTypes.func.isRequired,
  removeSubjectPosts: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  subjects: PropTypes.object.isRequired,
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
