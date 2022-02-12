import { useEffect, useState } from "react";
import { Alert, ALERT_TYPE } from "../../../common/alert";
import { useHistory } from "react-router-dom";
import { routes } from "../../app/contants";

type OPTION_TYPE = {
  value: string;
  text: string;
};

type IP_CAMERA_INFO_TYPE = {
  ipAddress: string;
  ipUsername: string;
  ipPassword: string;
  cameraType: string;
};

const defaultCamera: OPTION_TYPE = {
  value: "0",
  text: "Select camera",
};

const useSetting = () => {
  const history = useHistory();
  const initIpCameraInfo = {
    ipAddress: localStorage.getItem("ipAddress") ?? "",
    ipUsername: localStorage.getItem("ipUsername") ?? "",
    ipPassword: localStorage.getItem("ipPassword") ?? "",
    cameraType: localStorage.getItem("cameraType") ?? "",
  };

  const [options, setOptions] = useState<OPTION_TYPE[]>([]);
  const [currentCamera, setCurrentCamera] = useState<string>(
    localStorage.getItem("address") ?? "0"
  );
  const [ipCameraInfo, setIpCameraInfo] = useState<IP_CAMERA_INFO_TYPE>(
    initIpCameraInfo
  );

  console.log({ ipCameraInfo });

  const GetDeviceList = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      let list = [defaultCamera];
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

  const applySetting = () => {
    if (currentCamera == "" || ipCameraInfo.cameraType == "") {
      Alert("Please enter enough information", ALERT_TYPE.ERROR);
      return;
    }
    if (ipCameraInfo.cameraType == "webcam") {
      localStorage.setItem("address", currentCamera);
      localStorage.setItem("cameraType", ipCameraInfo.cameraType);

      // remove info ip camera
      localStorage.removeItem("ipAddress");
      localStorage.removeItem("ipUsername");
      localStorage.removeItem("ipPassword");
    } else if (ipCameraInfo.cameraType == "arduino - bldc") {
      if (
        ipCameraInfo.ipPassword == "" ||
        ipCameraInfo.ipUsername == "" ||
        ipCameraInfo.ipPassword == ""
      ) {
        Alert("Please enter enough information", ALERT_TYPE.ERROR);
        return;
      }
      localStorage.setItem("address", currentCamera);
      localStorage.setItem("cameraType", ipCameraInfo.cameraType);
      localStorage.setItem("ipAddress", ipCameraInfo.ipAddress);
      localStorage.setItem("ipUsername", ipCameraInfo.ipUsername);
      localStorage.setItem("ipPassword", ipCameraInfo.ipPassword);
    }
    history.push(routes.main);
  };

  const backToCamera = () => {
    history.push(routes.main);
  };

  useEffect(() => {
    GetDeviceList();
  }, []);

  return {
    options,
    ipCameraInfo,
    setIpCameraInfo,
    currentCamera,
    setCurrentCamera,
    applySetting,
    backToCamera,
  };
};

export default useSetting;
