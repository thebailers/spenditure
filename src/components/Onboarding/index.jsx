import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { addHousehold, addOnboardingStages } from './action_creators';

import '../../styles/typography.css';
import '../../styles/errors.css';

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        generateHouseholdError: '',
      },
    };
  }

  defineHousehold(createHousehold) {
    this.setState({ createHousehold });
  }

  addHousehold() {
    this.props.addHousehold(this.state.new, this.props.user).then(
      (success) => {
        this.props.addOnboardingStages(this.props.user.uid).then((res) => {}, (err) => {});
      },
      (err) => {
        this.setState({ errors: { generateHouseholdError: err.message } });
      },
    );
  }

  render() {
    const { createHousehold, errors: { generateHouseholdError } } = this.state;
    const { household: { uid } } = this.props;

    return (
      <div>
        <h1>Let&apos;s get you set up.</h1>
        <p>
          Are you joining an{' '}
          <button onClick={() => this.defineHousehold('existing')}>existing household</button>, or
          setting up a <button onClick={() => this.defineHousehold('new')}>new household</button>?
        </p>

        {createHousehold === 'new' &&
          !uid && (
            <div>
              <h2>How many spenders in your household?</h2>
              <p>
                We will generate a unique household code so that you can share this with other
                household members. When they sign up, they can enter the code to join your household
                on spenditure
              </p>
              {generateHouseholdError && (
                <div className="error">{this.state.errors.generateHouseholdError}</div>
              )}
              <input type="submit" value="Generate household" onClick={() => this.addHousehold()} />
            </div>
          )}

        {createHousehold === 'new' &&
          uid && (
            <div>
              <h2>Your unique household ID is {uid}</h2>
              <p>
                Please send this to any other household members so they can quote this when
                registering to join your household.
              </p>
              <button>Complete setup and proceed to your dashboard</button>
            </div>
          )}

        {createHousehold === 'existing' && <div>Existing</div>}

        {/*
          On press of generate household, on success, add a household ID to the DB, and write this to the page
          Keep onboarded as false in db - need some way of querying stage 1 or 2
          Add a stage1 and stage2 onboarded, stage 1 is true, 2 is false
          This flag when stage 2 is false takes the user back to the next step:
          Display the household ID to the user and telling them to send to any other household members, and a button to
          Complete registration
          This sets stage 2 to true, and does all setup.
          User will now always be sent to the dashboard
        */}
      </div>
    );
  }
}

Onboarding.defaultProps = {
  household: {},
};

Onboarding.propTypes = {
  addHousehold: PropTypes.func.isRequired,
  addOnboardingStages: PropTypes.func.isRequired,
  household: PropTypes.shape({
    uid: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  user: state.auth.user,
  household: state.household,
});

export default connect(mapStateToProps, { addHousehold, addOnboardingStages })(Onboarding);
