import React from 'react'

const LaunchButton = (props) => {
  return (
    <button type="button" className="btn btn-primary btn-lg mt-3" onClick={() => {
      props.setIsActive(props.id, true)
    }}>
      Launch
    </button>
  )
}

export default LaunchButton
