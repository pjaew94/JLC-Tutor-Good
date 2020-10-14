import {
  GET_POSTS,
  REMOVE_POSTS,
  POSTS_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_COMMENT,
  ADD_POST,
  REMOVE_COMMENT,
} from "../actions/types.js";

const initialState = {
  subject: null,
  posts: null,
  loading: true,
  error: {},
};

export default function (state = initialState, actions) {
  const { type, payload, id, updatedPosts, subjectId } = actions;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        subject: subjectId,
        posts: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case REMOVE_POSTS:
      return {
        posts: null,
        loading: false,
      };
    case POSTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case ADD_COMMENT:
        state.posts.map((post) => {
            if (post._id === id) {
              return { ...state.post, comments: payload };
            }
          })
      return {
        ...state,
        posts: updatedPosts,
        loading: false,
      };
    case REMOVE_COMMENT:
        state.posts.map((post) => {
            if (post._id === id) {
              post.comments.filter((comment) => comment._id !== payload);
            }
        })
      return {
        ...state,
        posts: updatedPosts,
        loading: false,
      };

    default:
      return state;
  }
}
