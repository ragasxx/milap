import { Avatar, Typography, Button, Dialog } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Post.css";
import CommentCard from "../CommentCard/CommentCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  MoreVert,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
  Favorite,
} from "@mui/icons-material";
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../../Actions/Post";
import {
  getFollowingPosts,
  getMyPosts,
  getUserPosts,
  loadUser,
} from "../../Actions/User";
import User from "../User/User";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerId,
  ownerImage,
  ownerName,
  isDelete = false,
  isPage = "home",
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState("");
  const [captionToggle, setCaptionToggle] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  const { user } = useSelector((state) => state.user);
  // const { user: userpost } = useSelector((state) => state.userPosts);
  // const { user: userprofile } = useSelector((state) => state.userProfile);

  const handleLiked = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));
    if (isPage === "accpage") {
      dispatch(getMyPosts());
    }
    if (isPage === "homepage") {
      dispatch(getFollowingPosts());
    }
    if (isPage === "propage") {
      dispatch(getUserPosts(params.id));
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));
    if (isPage === "accpage") {
      dispatch(getMyPosts());
    }
    if (isPage === "homepage") {
      dispatch(getFollowingPosts());
    }
    if (isPage === "propage") {
      dispatch(getUserPosts(params.id));
    }
  };

  const updateCaptionHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        {isPage === "accpage" ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : (
          ""
        )}
      </div>
      <img src={postImage} alt="post" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={600}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <Button onClick={() => setLikesUser(!likesUser)}>
        <Typography>{likes.length}</Typography>
      </Button>

      <div className="postFooter">
        <Button onClick={handleLiked}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>
        <Button onClick={deletePostHandler}>
          {isDelete ? <DeleteOutline /> : ""}
        </Button>
      </div>
      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h6">Liked By</Typography>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              avatar={like.avatar.url}
              name={like.name}
            />
          ))}
        </div>
      </Dialog>
      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h6">Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              placeholder="Type your comment here.."
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              required
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>

          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                key={item._id}
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                postId={postId}
                isPage={"accpage"}
              />
            ))
          ) : (
            <Typography>No Comments Yet!</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h6">Update Caption</Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              placeholder="Type your caption here..."
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              required
            />
            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
