import React from 'react'
import "../../../assets/style.css"
import RecordingIcon from "../../../assets/recording_polly.png";
import TakePhotoIcon from "../../../assets/takephoto.png";
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

        <div className='control-btn circular' onClick={() => console.log('')}><i>2 </i></div>
        <div className='control-btn circular'><i>3 </i></div>
        <div className='control-btn circular'><i>4 </i></div>

        <div className='control-btn circular'><i>5 </i></div>

        <div className='control-btn circular'><i>6 </i></div>
        <div className='control-btn circular'><i>7 </i></div>
        <div className='control-btn circular'><i>8 </i></div>
        {/* <div className='control-btn' ><i>11 </i></div> */}
        {/* </label> */}
      </div>
    </>
  )
}

export default ControlBottom