import React from 'react'
import "../../../assets/style.css"
import { useHistory } from "react-router-dom";
// import { routes } from "../../../modules/app/contants";
import { routes } from "../../../../modules/app/contants";

import SettingIcon from "../../../assets/setting.png";

const SideBarSetting = (props) => {
  const {
    vidOff,
    isLogoClicked
  } = props
  const history = useHistory();

  return (
    <div className={isLogoClicked ? "btn-setting active" : "btn-setting"}>
      <div
        onClick={() => {
          vidOff();
          history.push(routes.setting);
        }}
      >
        <img src={SettingIcon} alt="" />
      </div>
    </div>
  )
}

export default SideBarSetting