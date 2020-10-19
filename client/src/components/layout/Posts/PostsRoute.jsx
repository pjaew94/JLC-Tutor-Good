import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { getSubjectPosts } from "../../../actions/posts";

import coffeeGif from "../../../svgs/coffee.gif";

import Posts from "./Posts";
import PostForm from "../Posts/PostForm";
import Spinner from "../../layout/Spinner";

import "../../styles/PostsRoute.scss";

const PostsRoute = ({
  auth: { user },
  posts: { posts, loading, subject },
  match,
}) => {
  // Pulls out the posts and sorts by date. --- Quality: Get exact seconds when updated and sort by seconds instead of date.
  const subjectPosts = posts;
  let arrangedSubjects = [];
  if (subjectPosts) {
    arrangedSubjects = subjectPosts.sort(function (x, y) {
      return y.due.replace(/-/g, "") - x.due.replace(/-/g, "");
    });
  }

  let postForm = null;
  if (user && posts) {
    postForm =
      user.status === "Instructor" || user.status === "Admin" ? (
        <PostForm subjectId={match.params.id} />
      ) : null;
  }

  const noPost = (
    <div className="no_post_container">
      <img src={coffeeGif} alt="Coffee Guy"></img>
      <h1>Nothing to see here yet...</h1>
    </div>
  );

  return loading && posts === null ? (
    <Spinner />
  ) : (
    <div className="posts_route_container">
      {posts && postForm}
      <div className="posts_route_inner_container">
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
                  subject={subject}
                  userStatus={user.status}
                />
              );
            })
          : noPost}
      </div>
    </div>
  );
};

PostsRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

export default connect(mapStateToProps, null)(PostsRoute);
