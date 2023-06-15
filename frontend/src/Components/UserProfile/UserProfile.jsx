import React from "react";
import "../Account/Account.css";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
  loadUser,
} from "../../Actions/User";
import { useEffect } from "react";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { useAlert } from "react-alert";
import User from "../User/User";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);

    await dispatch(followAndUnfollowUser(user._id));
    await dispatch(getUserProfile(params.id));
    dispatch(loadUser());
  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [dispatch, me._id, user, params.id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }
    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, userError, followError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {user && (
          <>
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

            {myProfile ? null : (
              <Button
                disabled={followLoading}
                variant="contained"
                onClick={followHandler}
                style={{ background: following ? "Red" : "blue" }}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}
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
                  avatar={follower.avatar.url}
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
              isPage={"propage"}
            />
          ))
        ) : (
          <Typography variant="h6">User has not made any post</Typography>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
