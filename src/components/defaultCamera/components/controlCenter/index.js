import React from 'react'
import "../../../assets/style.css"

const ControlCenter = (props) => {
  const {
    setIsTriangleClicked,
    isTriangleClicked,
  } = props
  return (
    <div className="control-center">
      <div className="triangle-container-center"
        onClick={() => {
          setIsTriangleClicked(!isTriangleClicked)
        }}
      >
        <div className="control-bold-line-top">
        </div>
        <div className="control-triangle-down">
        </div>
      </div>
    </div>
  )
}

export default ControlCenter