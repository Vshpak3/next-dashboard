import React from 'react'
import "../../../assets/style.css"

const LoaderPollyLogo = (props) => {
  const {
    pollyLogo
  } = props
  return (
      <div className='polly-image-loader'
      >
        <img src={pollyLogo} alt="" />
      </div>
  )
}

export default LoaderPollyLogo