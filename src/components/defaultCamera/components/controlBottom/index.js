import React from 'react'
import "../../../assets/style.css"
import WifiIcon from "../../../assets/wifi.png";
import SpeechTextIcon from "../../../assets/speechtext_new.png";
import FlashLightIcon from "../../../assets/flashlight.png";
import LazerIcon from "../../../assets/lazer.png";
import OnFrontCamera from "../../../assets/onfrontcamera.png";
import RecordingIcon from "../../../assets/recording_polly.png";
import TakePhotoIcon from "../../../assets/takephoto.png";
import FocusIcon from "../../../assets/focus_new.png";
import "./control-btm.css"



const ControlBottom = (props) => {
  const {
    setIsTriangleClicked,
    isTriangleClicked,
    takePhoto,
  } = props
  return (
    <><div className={isTriangleClicked ? "control-bottom active" : "control-bottom"}>
      {
        // !isTriangleClicked && (
        <div className={isTriangleClicked ? "control-recording active" : "control-recording"}
          onClick={() => {
            console.log('RECORD');
          }}
        >
          <img src={RecordingIcon} alt="" />
        </div>
        // )
      }

      <div className={isTriangleClicked ? "control-take-photo active" : "control-take-photo"}
      >
        <img src={TakePhotoIcon} onClick={() => {
          takePhoto();
        }} alt="" />
      </div>
      <div className="triangle-container"
        onClick={() => {
          setIsTriangleClicked(!isTriangleClicked);
        }}
      >
        <div className="control-triangle">
        </div>
        <div className="control-bold-line">
        </div>
      </div>
    </div>
      <div className={isTriangleClicked ? "control-menu active" : 'control-menu'}>
        {/* <input className='input-config' type='checkbox' id='control-toggle' checked={isTriangleClicked} onClick={() => {
          setIsTriangleClicked(!isTriangleClicked);
        } } /> */}
        {/* <label for={"control-toggle"} id="show-control-menu"> */}
        <div className={'control-btn'}>
        </div>

        <div className='control-btn circular' ><i>1 </i></div>

        <div className='control-btn circular' onClick={() => console.log('')}>
          <img src={OnFrontCamera} alt="" />
        </div>
        <div className='control-btn circular'>
          <img src={LazerIcon} alt="" />
        </div>
        <div className='control-btn circular'>
          <img src={FlashLightIcon} alt="" />
        </div>

        <div className='control-btn circular'><i>5 </i></div>

        <div className='control-btn circular'>
          <img src={WifiIcon} alt="" />
        </div>
        <div className='control-btn circular'>
          <img src={SpeechTextIcon} alt="" />
        </div>
        <div className='control-btn circular'>
        <img src={FocusIcon} alt="" />
        </div>
        {/* <div className='control-btn' ><i>11 </i></div> */}
        {/* </label> */}
      </div>
    </>
  )
}

export default ControlBottom