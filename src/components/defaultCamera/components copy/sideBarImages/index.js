import React from 'react'
import "../../../assets/style.css"
import PhotoIcon from "../../../assets/photos.png";
import { useHistory } from "react-router-dom";
// import { routes } from "../../../../modules/app/contants";


const SideBarImages = (props) => {
  const {
    // vidOff,
  } = props
  // const history = useHistory();

  return (
    <div className="btn-images">
      <div>
        <img src={PhotoIcon} alt="" />
      </div>
    </div>
  )
}

export default SideBarImages