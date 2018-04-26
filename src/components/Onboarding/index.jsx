import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import {
  addHousehold,
  addOnboardingStages,
  joinHousehold
} from "./action_creators";
import { createHousehold } from '../Household/action_creators';

import "../../styles/typography.css";
import "../../styles/errors.css";

// styles
import "./onboarding.css";

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      householdUid: '',
      errors: {
        generateHouseholdError: '',
        joinHouseholdError: '',
      }
    };
  }

  handleChange(i, v) {
    this.setState({
      [i]: v.target.value
    });
  }

  defineHousehold(createHousehold) {
    this.setState({ createHousehold });
  }

  addHousehold() {
    const userDetails = {
      id: this.props.user._id,
    }
    this.props.createHousehold(userDetails);
    // this.props.addHousehold(this.props.user).then(
    //   () => {
    //     this.props
    //       .addOnboardingStages(this.props.user.uid)
    //       .then(res => {}, err => {});
    //   },
    //   err => this.setState({ errors: { generateHouseholdError: err.message } }),
    // );
  }

  joinHousehold() {
    this.props.joinHousehold(this.state.householdUid, this.props.user._id).then(
      res => console.log(res),
      err => this.setState({ errors: { joinHouseholdError: err.message } }),
    );
  }

  render() {
    const { createHousehold, errors: { generateHouseholdError, joinHouseholdError } } = this.state;
    const { household: { uid } } = this.props;

    return (
      <div className="onboarding">
        <h1>Let&apos;s get you set up.</h1>
        <p>
          Are you joining an{" "}
          <button onClick={() => this.defineHousehold("existing")}>
            existing household
          </button>
          , or setting up a{" "}
          <button onClick={() => this.defineHousehold("new")}>
            new household
          </button>?
        </p>

        {/* Display the create household dialog */}
        {createHousehold === "new" &&
          !uid && (
            <div>
              <h2>How many spenders in your household?</h2>
              <p>
                We will generate a unique household code so that you can share
                this with other household members. When they sign up, they can
                enter the code to join your household on spenditure
              </p>
              {generateHouseholdError && (
                <div className="error">
                  {this.state.errors.generateHouseholdError}
                </div>
              )}
              <input
                type="submit"
                value="Generate household"
                onClick={() => this.addHousehold()}
              />
            </div>
          )}

        {/* Display the created household ID */}
        {createHousehold === "new" &&
          uid && (
            <div>
              <h2>Your unique household ID is {uid}</h2>
              <p>
                Please send this to any other household members so they can
                quote this when registering to join your household.
              </p>
              <button>Complete setup and proceed to your dashboard</button>
            </div>
          )}

        {createHousehold === "existing" && (
          <div>
            <h2>Enter the unique household code</h2>
            <p>
              To join an existing household, enter the household code below.
            </p>

            {joinHouseholdError && (
              <div className="error">
                {this.state.errors.joinHouseholdError}
              </div>
            )}
            <input
              type="text"
              value={this.state.householdUid}
              onChange={v => this.handleChange("householdUid", v)}
            />

            <button onClick={() => this.joinHousehold()}>Join Household</button>
          </div>
        )}
      </div>
    );
  }
}

Onboarding.defaultProps = {
  household: {},
  user: {},
};

Onboarding.propTypes = {
  addHousehold: PropTypes.func.isRequired,
  addOnboardingStages: PropTypes.func.isRequired,
  joinHousehold: PropTypes.func.isRequired,
  createHousehold: PropTypes.func.isRequired,
  household: PropTypes.shape({
    uid: PropTypes.string,
  }),
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({
  user: state.auth.user,
  household: state.household,
});

export default connect(mapStateToProps, {
  addHousehold,
  addOnboardingStages,
  joinHousehold,
  createHousehold,
})(Onboarding);
