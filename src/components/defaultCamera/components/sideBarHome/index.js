import React from 'react';
import "../../../assets/style.css"
import { useHistory } from "react-router-dom";
import { routes } from "../../../../modules/app/contants";

import HomeIcon from "../../../assets/home.png";

const SideBarHome = (props) => {
  const {
    vidOff,
    isLogoClicked
  } = props
  const history = useHistory();

  return (
    <div className={isLogoClicked ? "btn-home active":"btn-home"}>
      <div
        onClick={() => {
          vidOff();
          history.push(routes.home);
        }}
      >
        <img src={HomeIcon} alt="" />
      </div>
    </div>
  )
}

export default SideBarHome