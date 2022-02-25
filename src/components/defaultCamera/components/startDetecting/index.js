import React from 'react'
import Unlock from "../../../assets/unlock.png";
import "../../../assets/style.css"
import StartDetecting from "../../../assets/onfrontcamera.png";

const startDectecting = (props) => {
  const {
    isLogoClicked,
    pollyLogo,
    setIsLogoClicked,
    lockIcon,
    setIconLock
  } = props

  return (
    <div className="btn-polly-logo"
      style={{
        position: 'absolute',
        right: '1%',
        top: '2%',
        height: '100px',
        width: '185px',
        display: 'flex',
        justifyContent: 'center',
        background: !lockIcon ? '#ED157F': '#5757578c',
        borderRadius: '30px',
        padding: '20px 40px 20px 50px',
        cursor: 'pointer',
        zIndex: 1,
      }}
      
    >
      <div

        onClick={() => {
          setIconLock(!lockIcon)
        }}
      >
        <img src={!lockIcon ? Unlock : StartDetecting} alt="" />
      </div>
    </div>
  )
}

export default startDectecting