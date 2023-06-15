import React from "react";
import { useState } from "react";
import "./UpdateProfile.css";
import { Typography, Button, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser, updateProfile } from "../../Actions/User";
import Loader from "../Loader/Loader";
import {toast} from "react-hot-toast";
const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const dispatch = useDispatch();


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      toast.error(updateError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [updateError, message,  error, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Register
        </Typography>

        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          className="updateProfileInputs"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          required
        />
        <input
          type="email"
          className="updateProfileInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          required
        />
        <Button disabled={updateLoading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
