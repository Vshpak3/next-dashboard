import HardwareCamera from "./hardwareCamera";

const useControlCamera = () => {
  const {
    PanRight,
    PanLeft,
    FastPanLeft,
    FastPanRight,
    TiltDown,
    // AdjustSpeed,
    TiltUp,
    globalPort
    // Stop,
  } = HardwareCamera();

  console.log('glbp', globalPort)

  const mouseOverFastRight = () => {
    console.log("fast-right");
    FastPanRight();
  };

  const mouseOverSlowRight = () => {
    console.log("slow-right");
    PanRight();
  };

  const stop = () => {
    console.log("stop");
    //if (localStorage.getItem("cameraType") === "arduino - servo") 
    // Stop();
  };

  const mouseOverFastLeft = () => {
    console.log("fast-left");
    FastPanLeft();
  };

  const mouseOverSlowLeft = () => {
    console.log("slow-left");
    PanLeft();
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
