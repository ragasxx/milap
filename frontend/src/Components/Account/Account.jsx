import React from "react";
import "./Account.css";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyProfile, getMyPosts, logoutUser } from "../../Actions/User";
import { useEffect } from "react";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import User from "../User/User";
import { Link } from "react-router-dom";
import { useState } from "react";
import {toast} from "react-hot-toast";

const Account = () => {
  const dispatch = useDispatch();
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);
  const { user, loading: userLoading } = useSelector((state) => state.user);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      toast.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [ error, message, likeError, dispatch]);

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    alert.success("Logged out successfully ");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <div>
          <Button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography color="black">Followers</Typography>
          </Button>
          <Typography>{user.followers.length}</Typography>
        </div>
        <div>
          <Button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography color="black">Following</Typography>
          </Button>
          <Typography>{user.following.length}</Typography>
        </div>
        <div>
          <Button>
            <Typography color="black">Post</Typography>
          </Button>
          <Typography>{user.posts.length}</Typography>
        </div>
        <Button variant="contained" onClick={logoutHandler}>
          LOGOUT
        </Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Forgot Password?</Link>
        <Button
          disabled={deleteLoading}
          onClick={deleteProfileHandler}
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
        >
          Delete My Profile
        </Button>
        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h6">Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={"hello"}
                />
              ))
            ) : (
              <Typography>"No followers"</Typography>
            )}
          </div>
        </Dialog>
        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h6">Following</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography>"No following"</Typography>
            )}
          </div>
        </Dialog>
      </div>
      <div className="accountright">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isPage={"accpage"}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">No post to show</Typography>
        )}
      </div>
    </div>
  );
};

export default Account;
