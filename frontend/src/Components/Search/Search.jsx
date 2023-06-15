import React, { useState } from "react";
import "./Search.css";

import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";

const Search = () => {
  const [name, setName] = useState("");

  const { users, loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h4" style={{ padding: "2vmax" }}>
          Search a user
        </Typography>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          required
        />
        <Button disabled={loading} type="submit">
          Search
        </Button>
        <div className="searchResults">
          {users && users.length > 0 ? (
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))
          ) : (
            <Typography variant="h6"> User Not Found</Typography>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
