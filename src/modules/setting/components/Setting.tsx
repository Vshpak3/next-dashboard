import React, { FC } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import useSetting from "../hooks/useSetting";
import { ToastContainer } from "react-toastify";
import BtnBack from "../../../components/assets/btn-back.png";

interface SettingProps {}
const Setting: FC<SettingProps> = () => {
  const {
    options,
    ipCameraInfo,
    setIpCameraInfo,
    currentCamera,
    setCurrentCamera,
    applySetting,
    backToCamera,
  } = useSetting();

  console.log({ currentCamera });

  return (
    <div className="col-md-5 pt-5">
      <div className="d-flex align-items-center">
        <span onClick={backToCamera} className="button_click_cursor">
          <img src={BtnBack} alt="back" />
        </span>
        <span className="h2 m-0 ml-4">Setting</span>
      </div>
      <div className="change-camera">
        <FormGroup>
          <Label for="selectCamera">
            Select camera<span className="text-danger">*</span>
          </Label>
          <Input
            id="selectCamera"
            name="select"
            type="select"
            onChange={(e) => setCurrentCamera(e.target.value)}
            defaultValue={currentCamera}
          >
            {options.length &&
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="cameraType">
            Select type<span className="text-danger">*</span>
          </Label>
          <Input
            id="cameraType"
            name="cameraType"
            type="select"
            onChange={(e) =>
              setIpCameraInfo({ ...ipCameraInfo, cameraType: e.target.value })
            }
            defaultValue={ipCameraInfo.cameraType}
          >
            <option value="">Select camera type</option>
            <option value="webcam">Webcam</option>
            <option value="arduino - bldc">Loro 1.0 device</option>
          </Input>
        </FormGroup>
        {ipCameraInfo.cameraType == "arduino - bldc" && (
          <React.Fragment>
            <FormGroup>
              <Label for="ipAddress">
                Ip address<span className="text-danger">*</span>
              </Label>
              <Input
                id="ipAddress"
                name="ipAddress"
                placeholder="Ip address"
                type="text"
                value={ipCameraInfo.ipAddress}
                onChange={(e) =>
                  setIpCameraInfo({
                    ...ipCameraInfo,
                    ipAddress: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSearch">
                User Name<span className="text-danger">*</span>
              </Label>
              <Input
                id="ipUserName"
                name="ipUserName"
                placeholder="Ip User Name"
                type="text"
                value={ipCameraInfo.ipUsername}
                onChange={(e) =>
                  setIpCameraInfo({
                    ...ipCameraInfo,
                    ipUsername: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSearch">
                Password<span className="text-danger">*</span>
              </Label>
              <Input
                id="ipPassword"
                name="ipPassword"
                placeholder="Password"
                type="password"
                value={ipCameraInfo.ipPassword}
                onChange={(e) =>
                  setIpCameraInfo({
                    ...ipCameraInfo,
                    ipPassword: e.target.value,
                  })
                }
              />
            </FormGroup>
          </React.Fragment>
        )}
        <Button color="danger" onClick={() => applySetting()}>
          Apply
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Setting;
