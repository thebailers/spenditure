import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

// actions
import { fetchOnboardedStatus } from '../Onboarding/action_creators'

// components
import Overview from './Overview/Overview'
import Nav from '../Nav/Nav'
import Onboarding from '../Onboarding'
import AddSpend from './AddSpend/AddSpend'

// styles
import './dashboard.css'
import CurrentUser from '../Auth/CurrentUser/CurrentUser'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 'home',
    }
  }

  render() {
    const { isLoading, onboarded } = this.props

    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <CurrentUser />

        {!onboarded && <Onboarding />}

        {isLoading && <div>Loading</div>}

        {!isLoading &&
          onboarded && (
            <Router>
              <div className="route-wrapper">
                <Nav page={this.state.currentPage} />
                <Route exact path="/" component={Overview} />
                <Route path="/add-spend" component={AddSpend} />
              </div>
            </Router>
          )}
      </div>
    )
  }
}

Dashboard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onboarded: PropTypes.bool.isRequired,
}

export default connect(null, { fetchOnboardedStatus })(Dashboard)
