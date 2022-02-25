import React, { useState } from 'react'
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
import StartDetecting from "../../../assets/onfrontcamera.png";
import Unlock from "../../../assets/unlock.png";


const ControlBottom = (props) => {
  const {
    setIsTriangleClicked,
    isTriangleClicked,
    takePhoto,
    setStartDetecting,
    isStartDetecting,
    setloadingOnDetecting,
    lockIcon,
    setIconLock
  } = props


  const isTriangleRenderer = () => {
    console.log({lockIcon , isStartDetecting})
    if (!lockIcon && isStartDetecting) {
      return (
        <div className="triangle-container"
        style={{
          width:'120px'
        }}
          onClick={() => {
            setIsTriangleClicked(!isTriangleClicked);
            setStartDetecting(false)
            setIconLock(false)
          }}
        >
          <div
            style={
              {
                position: 'absolute',
                top: '15%',
                left: '15%',
              }
            }
          >
            <img src={StartDetecting} alt="" />
          </div>
        </div>
      )
    }

    return (
      <div className="triangle-container"
        onClick={() => {
          setIsTriangleClicked(!isTriangleClicked);
        }}
      >
        <div>
          <div className="control-triangle">
          </div>
          <div className="control-bold-line">
          </div>
        </div>
      </div>
    )
  }


  return (
    <><div className={isTriangleClicked ? "control-bottom active" : "control-bottom"}>
      {
        <div className={isTriangleClicked ? "control-recording active" : "control-recording"}
          onClick={() => {
            console.log('RECORD');
          }}
        >
          <img src={RecordingIcon} alt="" />
        </div>
      }

      <div className={isTriangleClicked ? "control-take-photo active" : "control-take-photo"}
      >
        <img src={TakePhotoIcon} onClick={() => {
          takePhoto();
        }} alt="" />
      </div>
      {isTriangleRenderer()}
    </div>
      <div className={isTriangleClicked ? "control-menu active" : 'control-menu'}>
        <div className={'control-btn'}>
        </div>

        {
          // @ dont remove this
        }
        <div className='control-btn circular' ><i>1 </i></div>
        {
          // @ dont remove this
        }

        <div className='control-btn circular'
          onClick={() => {
            setIsTriangleClicked(false)
            setStartDetecting(true)
            setIconLock(true)
            setloadingOnDetecting(true)
          }}
        >
          <img src={OnFrontCamera} alt="" />
        </div>
        <div className='control-btn circular'
          onClick={() => console.log('onLazerIcon')}
        >
          <img src={LazerIcon} alt="" />
        </div>
        <div className='control-btn circular'
          onClick={() => console.log('FlashLightICon')}
        >
          <img src={FlashLightIcon} alt="" />
        </div>

        {
          // @ dont remove this
        }
        <div className='control-btn circular'><i>5</i></div>
        {
          // @ dont remove this
        }

        <div className='control-btn circular'
          onClick={() => console.log('WifiIcon')}
        >
          <img src={WifiIcon} alt="" />
        </div>
        <div className='control-btn circular'
          onClick={() => console.log('SpeechTextIcon')}
        >
          <img src={SpeechTextIcon} alt="" />
        </div>
        <div className='control-btn circular'
          onClick={() => console.log('FocusIcon')}
        >
          <img src={FocusIcon} alt="" />
        </div>
      </div>
    </>
  )
}

export default ControlBottom