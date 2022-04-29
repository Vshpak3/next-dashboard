"use strict";
import React, { useState, useLayoutEffect, useRef } from "react";
import "../../../assets/style.css";

const CameraOption = ({ loadVideo, cameraDeviceList, changeCamera }) => {
  return (
    <>
      <div
        class="select"
        style={{
          position: "absolute",
          right: "50%",
          top: "2%",
          height: "100px",
          width: "185px",
          display: "flex",
          justifyContent: "center",
          // background: !lockIcon ? '#ED157F': '#5757578c',
          borderRadius: "30px",
          padding: "20px 40px 20px 50px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        <label for="videoSource">Video source: </label>
        <select
          id="videoSource"
          onChange={(e) => changeCamera(e?.target?.value)}
        >
          {cameraDeviceList.map((option) => (
            <option value={option?.deviceId}>{option?.label}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CameraOption;
