import React, { useState } from "react";
import "./ResetPassword.css";
import { Typography, Button } from "@mui/material";
import { resetPassword } from "../../Actions/User";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");

  const { error, message, loading } = useSelector((state) => state.like);

  const dispatch = useDispatch();
  const alert = useAlert();

  const params = useParams();

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
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
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={resetPasswordHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Recover Password
        </Typography>
        <input
          type="password"
          className="resetPasswordInputs"
          placeholder="new password..."
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Link to="/">
          <Typography>Login!</Typography>
        </Link>
        <Typography>or</Typography>
        <Link to="/forgot/password">
          <Typography>Request Another Token</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
