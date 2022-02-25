import React from 'react'
import "../../../assets/style.css"
import Spinner from "../../../assets/Spinner.gif";
import LockImg from "../../../assets/lock.png";

const remote = window.require("electron").remote;

const getWindowSize = () => {
  return remote.getCurrentWindow().getBounds();
};

const loaderStartDetecting = (props) => {
  const {
    isLogoClicked,
    pollyLogo,
    setIsLogoClicked
  } = props

  let screenwidth = getWindowSize().width;
  let screenheight = getWindowSize().height;


  return (
    <div
      className="pending-load"
      style={{ width: screenwidth, height: screenheight }}
    >
      <div className="start-detecting">
        <img src={LockImg} className="mr-3" alt="lock" />
        <span className="mr-3">Start detecting</span>
        <img src={Spinner} alt="" />
      </div>
    </div>
  )
}

export default loaderStartDetecting