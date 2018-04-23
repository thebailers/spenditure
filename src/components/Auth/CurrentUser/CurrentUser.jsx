import React from "react";
import PropTypes from "prop-types";
import { app } from "../../../firebase";
import "./CurrentUser.css";

const CurrentUser = ({ user }) => {
  return (
    <div className="currentuser">
      <div className="App-header--logo">
        <h1 className="App-header--title">Spenditure</h1>
      </div>
      <div className="currentuser__wrap">
        <img
          className="currentuser__photo"
          src={user.photoURL}
          alt={user.displayName}
        />

        {user.displayName}, {user.email}, {user.uid}

        <button
          className="currentuser__signout"
          onClick={() => app.auth().signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

CurrentUser.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired
  })
};

export default CurrentUser;
