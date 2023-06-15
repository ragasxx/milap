import React, { useState } from "react";
import "./ForgotPassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import { useEffect } from "react";
import {toast} from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { error, message, loading } = useSelector((state) => state.like);

  const dispatch = useDispatch();
  const forgotHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [ error, message, dispatch]);

  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={forgotHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Recover Password
        </Typography>
        <input
          type="email"
          className="forgotPasswordInputs"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button disabled={loading} type="submit">
          Send Email
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
