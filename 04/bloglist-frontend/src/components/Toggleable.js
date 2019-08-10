import React, { useState } from 'react'

const Togglable = ({ buttonLabel, className, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className={className} onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button className="cancel" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}

export default Togglable
