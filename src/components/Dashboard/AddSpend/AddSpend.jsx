import React, { Component } from 'react'

import '../../../styles/forms.css'

class AddSpend extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'well hello',
      value: '34.35',
    }
  }
  render() {
    return (
      <div>
        <h1>Add Spend</h1>

        <form onSubmit={this.handleSubmit}>
          {/* Spend Name: */}
          <div className="form-group">
            <label htmlFor="name">Spend name</label>
            <input
              type="text"
              value={this.state.name}
              name="name"
              id="name"
              onChange={this.handleChange}
            />
          </div>

          {/* Spend Value: */}
          <div className="form-group">
            <label htmlFor="value">Spend value</label>
            <input
              type="number"
              value={this.state.value}
              name="value"
              id="value"
              onChange={this.handleChange}
            />
          </div>

          <h2>Spend Owner</h2>
          <p>Map over users: Simon, SA, Split</p>

          <div className="split">
            <h2>Split</h2>
            <p>Show this if there is a split.</p>
            <p>Split 50/50 checkbox</p>
            <p>Custom split</p>

            <h3>If custom split show this</h3>
            <p>
              Inputs for each user. When 2nd to last input is added, the remaining is prefilled with
              remaining value
            </p>
            <p>Is validated against the value to make sure it is the right amount</p>
          </div>
        </form>
      </div>
    )
  }
}

export default AddSpend
