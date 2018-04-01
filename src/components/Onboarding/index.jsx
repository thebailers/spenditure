import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { generateHouseholdID } from './action_creators';

import '../../styles/typography.css';

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new: {
        numberOfSpenders: 1,
      },
    };
  }

  defineHousehold(household) {
    this.setState({ household });
  }

  handleNewSpendersNumberChange(v) {
    this.setState({
      new: {
        ...this.state.new,
        numberOfSpenders: v.target.value,
      },
    });
  }

  generateHouseholdID() {
    this.props.generateHouseholdID(this.state.new, this.props.user).then(
      (success) => {
        console.log('success - household generated');
        // need to update the onboarded stages in db
      },
      (err) => {},
    );
  }

  render() {
    const { household } = this.state;
    return (
      <div>
        <h1>Let&apos;s get you set up.</h1>
        <p>
          Are you joining an{' '}
          <a onClick={() => this.defineHousehold('existing')}>existing household</a>, or setting up
          a <a onClick={() => this.defineHousehold('new')}>new household</a>?
        </p>

        {household === 'new' && (
          <div>
            <h2>How many spenders in your household?</h2>
            <p>
              We will generate a unique household code so that you can share this with other
              household members. When they sign up, they can enter the code to join your household
              on spenditure
            </p>

            <input
              type="number"
              value={this.state.new.numberOfSpenders}
              onChange={v => this.handleNewSpendersNumberChange(v)}
            />

            <input
              type="submit"
              value="Generate household"
              onClick={() => this.generateHouseholdID()}
            />
          </div>
        )}

        {household === 'existing' && <div>Existing</div>}

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

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { generateHouseholdID })(Onboarding);
