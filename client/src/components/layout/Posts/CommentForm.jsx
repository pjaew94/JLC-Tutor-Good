import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../../actions/posts";


import '../../styles/CommentForm.scss'

const CommentForm = ({ addComment, subject, postId }) => {

   const [formData, setFormData] = useState({
    text: ''
})

const { text } = formData

const onChange = (e) =>
setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = (e) => {
    e.preventDefault()
    addComment(postId, formData, subject);

}

    return (
        <form className='comment_form' onSubmit={onSubmit}>
        <textarea 
            type='text'
            name='text'
            value={text}
            placeholder='Add comment...'
            onChange={onChange}
        />
        <div className='button_container'>
            <input type='submit' className='button' value='Comment' />
        </div>
    </form>
    )
}


CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm)