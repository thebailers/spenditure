import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

// styles
import "./CurrentUser.css";

const CurrentUser = ({ user }) => {
  return (
    <div className="currentuser">
      <div className="App-header--logo">
        <h1 className="App-header--title">Spenditure</h1>
      </div>
      <div className="currentuser__wrap">
        Welcome back {user.firstname}

        <button
          className="currentuser__signout"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

CurrentUser.defaultProps = {
  user: {},
};

CurrentUser.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(CurrentUser);
