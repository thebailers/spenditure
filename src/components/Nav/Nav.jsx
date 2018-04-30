import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Nav.css'

const Nav = ({ page }) => (
  <nav className="nav">
    <ul className="nav__list">
      <li className={classnames(page === 'home' ? 'nav__list--current' : null)}>
        <Link to="/">Dashboard</Link>
      </li>
      <li className={classnames(page === 'addspend' ? 'nav__list--current' : null)}>
        <Link to="/add-spend">Add Spend</Link>
      </li>
    </ul>
  </nav>
)

const { string } = PropTypes

Nav.propTypes = {
  page: string.isRequired,
}

export default Nav
