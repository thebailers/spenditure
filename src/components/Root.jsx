import React, { Component } from "react";
import { connect } from "react-redux";
import * as _ from "ramda";
import PropTypes from "prop-types";

import { db } from "../firebase";

// components
import CurrentUser from "./Auth/CurrentUser/CurrentUser";
import SignIn from "./Auth/SignIn/SignIn";
import Dashboard from "./Dashboard/Dashboard";

// actions
import { fetchUser } from "./Auth/action_creators";
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
    // fetch user Firebase, query db & check the user is set up, as we need
    // to know whether to onboard them, or progress them to the dashboard.
    this.props.fetchUser().then(
      // on success we return the user uid from Firebase
      user => {
        // success is the user uid

        // fetch household data
        this.props.fetchHouseholdId(user.uid);

        // 1. query db for users/userid
        // 2a. user in db - check onboarded status
        // 2b. no user in db - update db with user details, return onboarded false flag

        // 1.
        const usersRef = db.collection("users").doc(user.uid);
        usersRef
          .get()
          .then((userId) => {
            if (userId.exists) {
              // 2a. need to query the onboarded status
              this.props.fetchOnboardedStatus(user.uid).then(
                res => {

                  // res is bool onboarded value
                  this.setState({ isLoading: false });
                },
                (err) => {
                  console.log('------')
                  console.log(err)
                  console.log('------')
                }
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
        // const userCheck = usersRef.where("uid", "==", user.uid);
        // console.log(userCheck);

        // database.ref(`spenditure/users/${user.uid}`).once("value", snapshot => {
        //   const userId = snapshot.val();
        //   if (userId) {
        //     // 2a. need to query the onboarded status
        //     this.props.fetchOnboardedStatus(user.uid).then(
        //       res => {
        //         // res is bool onboarded value
        //         this.setState({ isLoading: false });
        //       },
        //       () => {}
        //     );
        //   } else {
        //     // 2b. need to populate the user onboarding flag in the db
        //     database.ref(`/spenditure/users/${user.uid}`).set({
        //       fullName: user.displayName,
        //       email: user.email,
        //       onboarded: false
        //     });
        //   }
        // });
      },
      error => {
        console.log(error);
      }
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
  fetchUser: PropTypes.func.isRequired,
  fetchOnboardedStatus: PropTypes.func.isRequired,
  fetchHouseholdId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  onboarded: state.onboarding.onboarded
});

export default connect(mapStateToProps, {
  fetchUser,
  fetchOnboardedStatus,
  fetchHouseholdId
})(Root);
