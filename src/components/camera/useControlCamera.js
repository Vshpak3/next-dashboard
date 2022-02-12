import HardwareCamera from "./hardwareCamera";

const useControlCamera = () => {
  const {
    PanRight,
    PanLeft,
    //FastPanLeft,
    //FastPanRight,
    TiltDown,
    AdjustSpeed,
    TiltUp,
    Stop,
  } = HardwareCamera();

  const mouseOverFastRight = () => {
    console.log("fast-right");
    //if (localStorage.getItem("cameraType") === "arduino - servo") {
      AdjustSpeed("2");
      PanRight();
    // } else if (
    //   localStorage.getItem("cameraType") === "arduino - bldc" ||
    //   localStorage.getItem("cameraType") === "raspberrypi"
    // )
    //   FastPanRight();
  };

  const mouseOverSlowRight = () => {
    console.log("slow-right");
    //if (localStorage.getItem("cameraType") === "arduino - servo") {
      AdjustSpeed("1");
      PanRight();
    // } else if (
    //   localStorage.getItem("cameraType") === "arduino - bldc" ||
    //   localStorage.getItem("cameraType") === "raspberrypi"
    // )
      //PanRight();
  };

  const stop = () => {
    console.log("stop");
    //if (localStorage.getItem("cameraType") === "arduino - servo") 
      Stop();
  };

  const mouseOverFastLeft = () => {
    console.log("fast-left");
    //if (localStorage.getItem("cameraType") === "arduino - servo") {
      AdjustSpeed("2");
      PanLeft();
    // } else if (
    //   localStorage.getItem("cameraType") === "arduino - bldc" ||
    //   localStorage.getItem("cameraType") === "raspberrypi"
    // )
    //   FastPanLeft();
  };

  const mouseOverSlowLeft = () => {
    console.log("slow-left");
    //if (localStorage.getItem("cameraType") === "arduino - servo") {
      AdjustSpeed("1");
      PanLeft();
    // } else if (
    //   localStorage.getItem("cameraType") === "arduino - bldc" ||
    //   localStorage.getItem("cameraType") === "raspberrypi"
    // )
    //   PanLeft();
  };

  const mouseOverTop = () => {
    console.log("top");
    TiltUp();
  };

  const mouseOverBottom = () => {
    console.log("down");
    TiltDown();
  };

  //console.log("useControlCamera");

  return {
    mouseOverBottom,
    mouseOverTop,
    mouseOverFastLeft,
    mouseOverFastRight,
    mouseOverSlowLeft,
    mouseOverSlowRight,
    stop,
  };
};
export default useControlCamera;
