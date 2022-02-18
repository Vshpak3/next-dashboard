import React from "react";
import "../../../assets/style.css"
import Top from "../../../assets/top.png";
import Bottom from "../../../assets/bottom.png";
import FastLeft from "../../../assets/fast-left.png";
import FastRight from "../../../assets/fast-right.png";
import Back from "../../../assets/back.png";
import Next from "../../../assets/next.png";

const ControlHardWare = (props) => {
  const {
    mouseOverTop,
    mouseOverSlowRight,
    mouseOverSlowLeft,
    mouseOverFastRight,
    mouseOverFastLeft,
    mouseOverBottom,
    stop,
    isLogoClicked
  } = props

  return (
    <div className="control-hardware">
      {
        isLogoClicked ?
          (
            <div className="fast-left"></div>
          )
          : (
            <div
              className="fast-left"
              onMouseDown={() => mouseOverFastLeft()}
              onMouseUp={() => stop()}
            >
              <img src={FastLeft} alt="" />
            </div>
          )
      }
      <div
        className="slow-left"
        onMouseDown={() => mouseOverSlowLeft()}
        onMouseUp={() => stop()}
      >
        <img src={Back} alt="" />
      </div>
      <div className="center">
        <div
          className="top"
          onMouseDown={() => mouseOverTop()}
          onMouseUp={() => stop()}
        >
          <img src={Top} alt="" />
        </div>
        <div
          // className="bottom"
          onMouseDown={() => mouseOverBottom()}
          onMouseUp={() => stop()}
        >
          <img src={Bottom} alt="" />
        </div>
      </div>
      <div
        className="slow-right"
        onMouseDown={() => mouseOverSlowRight()}
        onMouseUp={() => stop()}
      >
        <img src={Next} alt="" />
      </div>
      <div
        className="fast-right"
        onMouseDown={() => mouseOverFastRight()}
        onMouseUp={() => stop()}
      >
        <img src={FastRight} alt="" />
      </div>
    </div>
  )

}

export default ControlHardWare