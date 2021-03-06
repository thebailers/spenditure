import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import * as _ from 'ramda'
import PropTypes from 'prop-types'

// components
import SignIn from './Auth/SignIn/SignIn'
import Dashboard from './Dashboard/Dashboard'

// actions
import { fetchHouseholdId } from './Household/action_creators'
import { fetchOnboardedStatus } from './Onboarding/action_creators'

class Root extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    // Auth watcher
  }

  render() {
    const { user } = this.props

    return (
      <Router>
        <div className="route-wrapper">
          <Route
            exact
            path="/"
            render={() => (_.isEmpty(user) ? <SignIn /> : <Redirect to="/dashboard" />)}
          />
          <Route
            path="/dashboard"
            user={user}
            render={() =>
              (_.isEmpty(user) ? <Redirect to="/" /> : <Dashboard isLoading={this.state.isLoading} />)
            }
          />
        </div>
      </Router>
    )
  }
}

Root.defaultProps = {
  user: {},
}

Root.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }),
}

const mapStateToProps = state => ({
  user: state.auth.user,
  onboarded: state.onboarding.onboarded,
})

export default connect(mapStateToProps, {
  fetchOnboardedStatus,
  fetchHouseholdId,
})(Root)
