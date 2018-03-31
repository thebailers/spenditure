import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// actions
import { fetchOnboardedStatus } from '../Onboarding/action_creators';

// components
import Overview from './Overview/Overview';
import Nav from '../Nav/Nav';
import Onboarding from '../Onboarding';
import AddSpend from './AddSpend/AddSpend';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'home',
    };
  }

  render() {
    const { isLoading, onboarded } = this.props;

    // Check if required state has been fetched and display a loading spinner until it has
    if (isLoading) {
      return <div>Loading</div>;
    }

    if (!isLoading && !onboarded) {
      return <Onboarding />;
    }

    return (
      <Router>
        <div className="route-wrapper">
          <Nav page={this.state.currentPage} />
          <Route exact path="/" component={Overview} />
          <Route path="/add-spend" component={AddSpend} />
        </div>
      </Router>
    );
  }
}

Dashboard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onboarded: PropTypes.bool.isRequired,
};

export default connect(null, { fetchOnboardedStatus })(Dashboard);
