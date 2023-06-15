import React, { useState } from "react";
import "./ForgotPassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import { useAlert } from "react-alert";
import { useEffect } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { error, message, loading } = useSelector((state) => state.like);

  const dispatch = useDispatch();
  const alert = useAlert();

  const forgotHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, dispatch]);

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
