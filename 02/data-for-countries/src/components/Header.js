import React from 'react'

const Header = ({ earth, title }) => (
  <div className="header">
    <h1>{title}</h1>
    <img src={earth} alt="earth" />
  </div>
)

export default Header
