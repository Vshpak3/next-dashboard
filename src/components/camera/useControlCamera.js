import HardwareCamera from "./hardwareCamera";

const useControlCamera = () => {
  const {
    PanRight,
    PanLeft,
    FastPanLeft,
    FastPanRight,
    TiltDown,
    handlePorts,
    AdjustSpeed,
    TiltUp,
    Stop,
  } = HardwareCamera();

  const mouseOverFastRight = () => {
    console.log("fast-right");
    if (localStorage.getItem("cameraType") === "arduino - servo") {
      AdjustSpeed("2");
      PanRight();
    } else if (
      localStorage.getItem("cameraType") === "arduino - bldc" ||
      localStorage.getItem("cameraType") === "raspberrypi"
    )
      FastPanRight();
  };

  const mouseOverSlowRight = () => {
    if (localStorage.getItem("cameraType") === "arduino - servo") {
      AdjustSpeed("1");
      PanRight();
    } else if (
      localStorage.getItem("cameraType") === "arduino - bldc" ||
      localStorage.getItem("cameraType") === "raspberrypi"
    )
      PanRight();
  };

  const stop = () => {
    if (localStorage.getItem("cameraType") === "arduino - servo") Stop();
  };

  const mouseOverFastLeft = () => {
    if (localStorage.getItem("cameraType") === "arduino - servo") {
      AdjustSpeed("2");
      PanLeft();
    } else if (
      localStorage.getItem("cameraType") === "arduino - bldc" ||
      localStorage.getItem("cameraType") === "raspberrypi"
    )
      FastPanLeft();
  };

  const mouseOverSlowLeft = () => {
    if (localStorage.getItem("cameraType") === "arduino - servo") {
      AdjustSpeed("1");
      PanLeft();
    } else if (
      localStorage.getItem("cameraType") === "arduino - bldc" ||
      localStorage.getItem("cameraType") === "raspberrypi"
    )
      PanLeft();
  };

  const mouseOverTop = () => {
    TiltUp();
  };

  const mouseOverBottom = () => {
    TiltDown();
  };

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
