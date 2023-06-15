import axios from "axios";
import {server} from "../store.js"

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await axios.get(`${server}/post/${id}`);

    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });

    const { data } = await axios.put(
      `${server}/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axios.delete(`${server}/post/deletecomment/${id}`, {
      data: { commentId },
    });
    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const createNewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const { data } = await axios.post(
      `${server}/post/upload`,
      {
        caption,
        image,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePost = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const { data } = await axios.put(
      `${server}/post/${id}`,
      {
        caption,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`${server}/post/${id}`);
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios.put(
        `${server}/update/password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };
