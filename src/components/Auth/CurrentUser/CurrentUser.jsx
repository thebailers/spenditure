import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

// actions
import { logout } from '../action_creators';

// styles
import "./CurrentUser.css";

const CurrentUser = ({ user, logout }) => {
  return (
    <div className="currentuser">
      <div className="App-header--logo">
        <h1 className="App-header--title">Spenditure</h1>
      </div>
      <div className="currentuser__wrap">
        Welcome back {user.firstname} {user.lastname}

        <button
          className="currentuser__signout"
          onClick={() => logout()}
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
    lastname: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(CurrentUser);
