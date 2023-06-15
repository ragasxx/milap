import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import "./CommentCard.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts } from "../../Actions/User";

const CommentCard = ({
  userId,
  avatar,
  name,
  comment,
  commentId,
  postId,
  isPage,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const deleteCommentHandler = async () => {
    await dispatch(deleteCommentOnPost(postId, commentId));
    if (isPage) {
      dispatch(getMyPosts());
    } else {
      await dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography minWidth={"6vmax"}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>
      {isPage ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
