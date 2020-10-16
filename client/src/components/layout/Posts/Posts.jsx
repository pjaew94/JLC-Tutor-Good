import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addLike,
  removeLike,
  addComment,
  deletePost,
} from "../../../actions/posts";
import { useMediaQuery } from 'react-responsive'

import {
  HiHeart,
  HiOutlineHeart,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { IconContext } from "react-icons";

import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "../../styles/Posts.scss";

const Posts = ({
  postId,
  postUserId,
  name,
  userStatus,
  homework,
  due,
  date,
  likes,
  comments,
  userId,
  subject,
  addLike,
  removeLike,
  addComment,
  deletePost,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [like, setLike] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEditM, setShowEditM] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    likes &&
      likes.map((e) => {
        if (e.user === userId) {
          return setLike(true);
        }
        return like;
      });


  }, []);

  // MediaQuery
  const isMobile = useMediaQuery({ query: '(max-width: 430px)'})

  // Like post logic function
  const likePost = () => {
    if (like === false) {
      addLike(postId);
      setLike(true);
    } else {
      removeLike(postId);
      setLike(false);
    }
  };

  // Check if user for delete to come up
  const checkAndShowEdit = () => {
    if (userId === postUserId && !isMobile) {
      setShowEdit(true);
    }
  };

  const checkAndShowEditM = () => {
    if(userId === postUserId && isMobile) {
      setShowEditM(!showEditM);
    }
  }

  const displayCommentForm = () => {
    setShowCommentForm(!showCommentForm);
    setShowComments(true);
  };

  const deleteEdit = (
    <div className={`delete_edit ${showEdit && "slide_delete_edit"} ${showEditM && "slide_delete_edit_M"}`}>
      <div className="edit_container">
        <IconContext.Provider value={{ className: "icon" }}>
          <FiEdit3 />
        </IconContext.Provider>
      </div>
      <div className="delete_container" onClick={() => deletePost(postId)}>
        <IconContext.Provider value={{ className: "icon" }}>
          <HiOutlineTrash />
        </IconContext.Provider>
      </div>
    </div>
  );

  return (
    <div
      className="post_container"
      onMouseEnter={() => checkAndShowEdit()}
      onMouseLeave={() => setShowEdit(false)}
    >
      {showEdit && deleteEdit}
      {isMobile && deleteEdit}
      <div className="post">
        <div className="left" onClick={() => checkAndShowEditM()}>
          <h3 className="homework">
            <span>Homework:</span> {homework}
          </h3>
          <h3 className="due">
            <span>Due:</span> {due}
          </h3>
        </div>
        <div className="right">
          <div className="by">
            <h3>By: {name}</h3>
            <h3>{date}</h3>
          </div>
          <div className="dopamine">
            <div className="button_container">
              <button className="like_button" onClick={() => likePost()}>
                <IconContext.Provider
                  value={{ className: `icon ${like ? "liked" : "no_like"}` }}
                >
                  {like ? <HiHeart /> : <HiOutlineHeart />}
                </IconContext.Provider>
              </button>
              <h4 className="likes_count">{likes && likes.length}</h4>
            </div>
            <div className="button_container">
              <button
                className="comment_button"
                onClick={() => setShowComments(!showComments)}
              >
                <IconContext.Provider value={{ className: "icon" }}>
                  <BiComment />
                </IconContext.Provider>
              </button>
              <h4 className="comments_count">{comments && comments.length}</h4>
            </div>
            <button className="add_button" onClick={() => displayCommentForm()}>
              <IconContext.Provider value={{ className: "icon" }}>
                <HiOutlinePlus />
              </IconContext.Provider>
            </button>
          </div>
        </div>
      </div>
      {showCommentForm && <CommentForm postId={postId} subject={subject} />}
      <div className="comments">
        {showComments === true
          ? comments.map((comment) => {
              return (
                <Comment
                  key={comment._id}
                  postId={postId}
                  commentUserId={comment.user}
                  userId={userId}
                  commentId={comment._id}
                  subject={subject}
                  name={comment.name}
                  text={comment.text}
                  date={comment.date}
                  userStatus={userStatus}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

Posts.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,

  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addComment,
  deletePost,
})(Posts);
