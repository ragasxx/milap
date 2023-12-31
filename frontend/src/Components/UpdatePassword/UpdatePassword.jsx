import React from "react";
import "./UpdatePassword.css";
import { Typography, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/Post";
import { useEffect } from "react";
import {toast} from "react-hot-toast";
const UpdatePassword = () => {
  const {
    error: updatePasswordError,
    message,
    loading,
  } = useSelector((state) => state.like);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (updatePasswordError) {
      toast.error(updatePasswordError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, updatePasswordError, message]);

  const updateHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePassword(oldPassword, newPassword));
  };

  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={updateHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Update Password
        </Typography>
        <input
          type="password"
          className="updatePasswordInputs"
          placeholder="old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="updatePasswordInputs"
          placeholder="new Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Button disabled={loading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
