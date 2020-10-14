import axios from "axios";

import { GET_POSTS, REMOVE_POSTS, POSTS_ERROR, UPDATE_LIKES, DELETE_POST,ADD_COMMENT, ADD_POST, REMOVE_COMMENT } from "./types";

// Get posts for the specific subject;
export const getSubjectPosts = (subject) => async dispatch => {
  try {

      const res = await axios.get(`/api/posts/${subject}`);

      

      dispatch({
        type: GET_POSTS,
        payload: res.data,
        subjectId: subject

      });
    
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const removeSubjectPosts = () => async dispatch => {
    try {
        dispatch({
            type: REMOVE_POSTS,
            payload: null
        })
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });
    }
}

// Add like
export const addLike = id => async dispatch => {
    try {
      const res = await axios.put(`/api/posts/like/${id}`);
  
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Remove like
  export const removeLike = id => async dispatch => {
    try {
      const res = await axios.put(`/api/posts/unlike/${id}`);
  
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };




//   *******************************

// Delete post
export const deletePost = id => async dispatch => {
    try {
      await axios.delete(`/api/posts/${id}`);
  
      dispatch({
        type: DELETE_POST,
        payload: id
      });
  
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Add post
  export const addPost = formData => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const res = await axios.post('/api/posts', formData, config);
  
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
  

    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  
  // Add comment
  export const addComment = (postId, formData, subject) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {

      const res = await axios.post(
        `/api/posts/comment/${postId}`,
        formData,
        config
      );

      const posts = await axios.get(`/api/posts/${subject}`)
  
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
        id: postId,
        updatedPosts: posts.data
      });


  

    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });

    }
  };
  
  // Delete comment
  export const removeComment = (postId, commentId, subject) => async dispatch => {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

      const posts = await axios.get(`/api/posts/${subject}`);

      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId,
        id: postId,
        updatedPosts: posts.data
      });



      // await getSubjectPosts(subject)
      

    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };