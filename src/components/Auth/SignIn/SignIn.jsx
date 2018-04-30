import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import TextFieldGroup from '../../Utility/Form/TextFieldGroup'

// actions
import { login } from '../../../components/Auth/action_creators'
import { addFlashMessage } from '../../../redux/actions/flashMessages'

// utilities
import validateInput from '../../../utilities/validateInput'

// styles
import './signin.css'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.login(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Welcome back!',
          })
        },
        err => this.setState({ errors: err.data.errors, isLoading: false }),
      )
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  render() {
    const { errors, isLoading } = this.state
    return (
      <div className="signin">
        <form className="loginform" onSubmit={this.onSubmit}>
          {errors.form && <div className="alert error">{errors.form}</div>}

          <TextFieldGroup
            error={errors.username}
            label="Username"
            onChange={e => this.onChange(e)}
            value={this.state.username}
            field="username"
          />

          <TextFieldGroup
            error={errors.password}
            label="Password"
            onChange={e => this.onChange(e)}
            value={this.state.password}
            field="password"
            type="password"
          />

          <button className="button" disabled={isLoading}>
            Sign In
          </button>
        </form>
      </div>
    )
  }
}

SignIn.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(null, { addFlashMessage, login })(SignIn)
