import React from 'react'
import Unlock from "../../../assets/unlock.png";
import "../../../assets/style.css"
import StartDetecting from "../../../assets/onfrontcamera.png";

const startDectecting = (props) => {
  const {
    isLogoClicked,
    pollyLogo,
    setIsLogoClicked,
    isStartDetecting,
    setStartDetecting,
    lockIcon,
    setIconLock,
    stopDetect,
    stopFollow,
    stopFaceRegocnition,
    stop
  } = props
    
  console.log(isStartDetecting,"isStartDetectingisStartDetecting")
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
          stop();
          stopDetect();
          stopFollow();
          stopFaceRegocnition();
          setIconLock(!lockIcon)
          setStartDetecting(!isStartDetecting)
        }}
      >
        <img src={!lockIcon ? Unlock : StartDetecting} alt="" />
      </div>
    </div>
  )
}

export default startDectecting