import React from 'react'
import "../../../assets/style.css"
import PhotoIcon from "../../../assets/photos.png";
import { useHistory } from "react-router-dom";
import { routes } from "../../../../modules/app/contants";
import { EMainDisplay } from '../../../../modules/home/constant';


const SideBarImages = (props) => {
  const {
    vidOff,
    isLogoClicked
  } = props
  const history = useHistory();

  return (
    <div className={isLogoClicked ? "btn-images active" : "btn-images"}>
      <div onClick={() => {
        vidOff();
        history.push({
          pathname: routes.home,
          state: {
            main_view: EMainDisplay.MyPhoto,
            default_clicked: {
              back_to_camera: false,
              photos: true, // Default
              videos: false,
              favorites: false,
              home:false
            }
          }
        });
      }}>
        <img src={PhotoIcon} alt="" />
      </div>
    </div>
  )
}

export default SideBarImages