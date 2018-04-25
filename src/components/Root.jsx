import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import * as _ from 'ramda';
import PropTypes from 'prop-types';

// components
import SignIn from './Auth/SignIn/SignIn';
import Dashboard from './Dashboard/Dashboard';

// actions
import { fetchHouseholdId } from './Household/action_creators';
import { fetchOnboardedStatus } from './Onboarding/action_creators';
import AddSpend from './Dashboard/AddSpend/AddSpend';
import Overview from './Dashboard/Overview/Overview';

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    // Auth watcher
  }

  render() {
    const { user } = this.props;

    return (
      <Router>
        <div className="route-wrapper">
          <Route exact path="/" render={() => (
            _.isEmpty(user) ? (
              <SignIn />
            ) : (
              <Redirect to="/dashboard" />
            ))}
          />
          <Route path="/dashboard" user={user} component={Dashboard} />
        </div>
      </Router>
    );
  }
}

Root.propTypes = {
  onboarded: PropTypes.bool.isRequired,
  fetchOnboardedStatus: PropTypes.func.isRequired,
  fetchHouseholdId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  onboarded: state.onboarding.onboarded,
});

export default connect(mapStateToProps, {
  fetchOnboardedStatus,
  fetchHouseholdId,
})(Root);
