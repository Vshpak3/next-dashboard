import React from 'react'
import "../../../assets/style.css"
import RecordingIcon from "../../../assets/recording_polly.png";
import TakePhotoIcon from "../../../assets/takephoto.png";

const ControlBottom = (props) => {
  const {
    setIsTriangleClicked,
    isTriangleClicked,
    takePhoto,
  } = props
  return (
    <div className="control-bottom">
      <div className="control-recording"
        onClick={() => {
          console.log('RECORD')
        }}
      >
        <img src={RecordingIcon} alt="" />
      </div>
      <div className="triangle-container"
        onClick={() => {
          setIsTriangleClicked(!isTriangleClicked)
        }}
      >
        <div className="control-triangle">
        </div>
        <div className="control-bold-line">
        </div>
      </div>
      <div className="control-take-photo"
      >
        <img src={TakePhotoIcon} onClick={
          () => {
            takePhoto()
          }
        } alt="" />
      </div>
    </div>
  )
}

export default ControlBottom