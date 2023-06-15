import React from "react";
import { useState } from "react";
import "./Register.css";
import { Typography, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import { useEffect } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const { loading, error,message } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
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
  }, [alert, error,message, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(name, email, password, avatar));
  };

  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Register
        </Typography>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input
          type="text"
          className="registerInputs"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          required
        />
        <input
          type="email"
          className="registerInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          required
        />
        <input
          type="password"
          className="registerInputs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
          required
        />
        <Link to="/">Already a user? Login Now</Link>
        <Button disabled={loading} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
