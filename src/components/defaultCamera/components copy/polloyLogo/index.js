import React from 'react'
import "../../../assets/style.css"

const PollyLogo = (props) => {
  const {
    isLogoClicked,
    pollyLogo,
    setIsLogoClicked
  } = props

  return (
    <div className="btn-polly-logo"
      style={{
        position: 'absolute',
        left: '1%',
        top: '2%',
        height: '100px',
        width: '185px',
        display: 'flex',
        justifyContent: 'center',
        background: isLogoClicked ? '#5757578c' : 'transparent',
        borderRadius: '30px',
        padding: '20px 40px 20px 50px',
        cursor: 'pointer',
        zIndex: 1
      }}
    >
      <div

        onClick={() => {
          setIsLogoClicked(!isLogoClicked)
        }}
      >
        <img src={pollyLogo} alt="" />
      </div>
    </div>
  )
}

export default PollyLogo