import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeComment } from "../../../actions/posts";
import { useMediaQuery } from 'react-responsive'

import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { IconContext } from "react-icons";

import "../../styles/Comment.scss";

const Comment = ({
  _id,
  name,
  text,
  date,
  commentUserId,
  userId,
  userStatus,
  commentId,
  postId,
  subject,
  removeComment
}) => {
  const [showEdit, setShowEdit] = useState(false);

   // MediaQuery
   const isMobile = useMediaQuery({ query: '(max-width: 430px)'})

  const checkAndShowEdit = () => {
    if (
      commentUserId === userId ||
      userStatus === "Instructor" ||
      userStatus === "Admin"
    ) {
      setShowEdit(!showEdit);
    }
  };

  const deleteEdit = (
    <div
      className={`delete_edit_comment ${
        showEdit && "delete_edit_comment_show"
      }`}
    >
      <div className="edit_container">
        <IconContext.Provider value={{ className: "icon" }}>
          <FiEdit3 />
        </IconContext.Provider>
      </div>
      <div className="delete_container" onClick={() => removeComment(postId, commentId, subject)}>
        <IconContext.Provider value={{ className: "icon" }}>
          <HiOutlineTrash />
        </IconContext.Provider>
      </div>
    </div>
  );

  return (
    <div
      className="comment"
      key={_id}
      onMouseEnter={checkAndShowEdit}
      onMouseLeave={checkAndShowEdit}
    >
      {showEdit && deleteEdit}
      <div
        className={`comment_container ${showEdit && "slide_comment_container"}`}
      >
        <h3>{text}</h3>
        <div className="by">
          <h4>{name}</h4>
          <h4>{date}</h4>
        </div>
      </div>
    </div>
  );
};


Comment.propTypes = {
  removeComment: PropTypes.func.isRequired,
}

export default connect(null, { removeComment })(Comment);
