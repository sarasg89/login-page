import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function Home() {
  if (Auth.loggedIn()) {
    return (
      <>
        <h1>Welcome to my website</h1>
        <div>
          Go to your <Link to="/profile">profile</Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Welcome to my website</h1>
        <div>
          <Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link>
          to gain access to all features
        </div>
      </>
    );
  }
}

export default Home;
