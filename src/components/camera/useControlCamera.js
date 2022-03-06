import HardwareCamera from "./hardwareCamera";

const useControlCamera = () => {
  const {
    PanRight,
    PanLeft,
    FastPanLeft,
    FastPanRight,
    TiltDown,
    Laser,
    FlashLight,
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

  const onLaser = () => {
    console.log("Lazer")
    Laser()
  }
  const onFlashLight = () => {
    console.log("Flash Light")
    FlashLight()
  }

  //console.log("useControlCamera");

  return {
    mouseOverBottom,
    mouseOverTop,
    mouseOverFastLeft,
    mouseOverFastRight,
    mouseOverSlowLeft,
    mouseOverSlowRight,
    onFlashLight,
    onLaser,
    stop,
  };
};
export default useControlCamera;
