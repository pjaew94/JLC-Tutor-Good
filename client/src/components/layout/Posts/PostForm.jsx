import React, { useState } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import "../../styles/PostForm.scss";
import { addPost } from "../../../actions/posts";

import { HiOutlinePlus } from "react-icons/hi";
import { IconContext } from "react-icons";

const PostForm = ({ subjectId, name, addPost }) => {


  const [formData, setFormData] = useState({
    homework: "",
    due: "",
    subject: subjectId,
    name: name,
  });

  const [showForm, setShowForm] = useState(false);

  const { homework, due } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    toggleForm();
    setFormData({ subject: null })
  };

  const toggleForm = () => {
    setFormData({ subject: subjectId})
    setShowForm(!showForm);
    console.log(subjectId)
  };

  return (
    <div className="post_form_container">
      <div className="title">
        <h1>Create New Post</h1>
        <div className="add_icon" onClick={() => toggleForm()}>
          <IconContext.Provider value={{ className: "icon" }}>
            <HiOutlinePlus />
          </IconContext.Provider>
        </div>
      </div>

      {showForm && (
        <form className="form" onSubmit={onSubmit}>
          <div className="due">
            <div className="due_text">
              <h3>Due Date:</h3>
              <h4>Format: YYYY-MM-DD</h4>
            </div>
            <input 
                type='text'
                name='due'
                value={due}
                onChange={onChange}
            />
          </div>
          <div className="homework">
            <h3>Homework</h3>
            <textarea 
                type='text'
                name='homework'
                value={homework}
                onChange={onChange}
            />
          </div>
          <div className='button_container'>
              <input type='submit' className='button' />
          </div>
        </form>
      )}
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
