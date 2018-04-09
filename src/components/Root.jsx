import React, { Component } from "react";
import { connect } from "react-redux";
import * as _ from "ramda";
import PropTypes from "prop-types";

import { app, db } from "../firebase";

// components
import CurrentUser from "./Auth/CurrentUser/CurrentUser";
import SignIn from "./Auth/SignIn/SignIn";
import Dashboard from "./Dashboard/Dashboard";

// actions
import { receiveUser, noUser } from "./Auth/action_creators";
import { fetchHouseholdId } from "./Household/action_creators";
import { fetchOnboardedStatus } from "./Onboarding/action_creators";

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    // Auth watcher
    app.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.props.receiveUser(user);

          console.log(user);
          // success is the user uid
          if (user.type !== "NO_USER") {
            // fetch household data
            this.props.fetchHouseholdId(user.uid);

            // 1. query db for users/userid
            // 2a. user in db - check onboarded status
            // 2b. no user in db - update db with user details, return onboarded false flag

            // 1.
            const usersRef = db.collection("users").doc(user.uid);
            usersRef
              .get()
              .then(userId => {
                if (userId.exists) {
                  // 2a. need to query the onboarded status
                  this.props
                    .fetchOnboardedStatus(user.uid)
                    .then(
                      () => this.setState({ isLoading: false }),
                      err => console.error(err)
                    );
                } else {
                  // 2b. need to populate the user onboarding flag in the db
                  usersRef.set({
                    fullName: user.displayName,
                    email: user.email,
                    onboarded: false
                  });
                }
              })
              .catch(err => console.error(err));
          }
        } else {
          this.props.noUser();
        }
      },
      err => console.error(err)
    );
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <div className="App-header">
          {!_.isEmpty(user) && <CurrentUser user={user} />}
          {_.isEmpty(user) && <SignIn />}

          <Dashboard
            isLoading={this.state.isLoading}
            onboarded={this.props.onboarded}
          />
        </div>
      </div>
    );
  }
}

Root.defaultProps = {
  user: {}
};

Root.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
    email: PropTypes.string
  }),
  onboarded: PropTypes.bool.isRequired,
  fetchOnboardedStatus: PropTypes.func.isRequired,
  fetchHouseholdId: PropTypes.func.isRequired,
  receiveUser: PropTypes.func.isRequired,
  noUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  onboarded: state.onboarding.onboarded
});

export default connect(mapStateToProps, {
  fetchOnboardedStatus,
  fetchHouseholdId,
  receiveUser,
  noUser
})(Root);
