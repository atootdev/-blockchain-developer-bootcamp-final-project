import React from 'react'

const EndButton = (props) => {
  return (
    <>
    <button type="button" className="btn btn-danger btn-lg mt-3" onClick={() => {
      props.setIsActive(props.id, false)
    }}>
      End
    </button>
    </>
  )
}

export default EndButton
