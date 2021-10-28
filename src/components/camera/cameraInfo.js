import { useEffect, useState } from "react";

const CameraInfo = () => {
  const [options, setOptions] = useState();

  const GetDeviceList = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      let list = [
        {
          value: "0",
          text: "Select camera",
        },
      ];
      for (let i = 0; i < devices.length; i += 1) {
        if (devices[i].kind === "videoinput") {
          list.push({
            value: devices[i].deviceId,
            text: devices[i].label,
          });
        }
      }
      setOptions(list);
    }
  };

  useEffect(() => {
    GetDeviceList();
  }, []);

  return { options };
};

export default CameraInfo;
