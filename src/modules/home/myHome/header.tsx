//import useState hook to create menu collapse state
import React, { useEffect, useState } from "react";

import SearchBar from './search'
import { useHistory } from "react-router-dom";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu
} from "react-pro-sidebar";

//import icons from react icons
import { FiLogOut } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { IoIosPhotos } from "react-icons/io"
import { IoHomeOutline } from "react-icons/io5"
import { MdVideoLibrary, MdFavoriteBorder } from "react-icons/md"


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./css/header.css";
import { routes } from "../../app/contants";
import { pollyLogo } from "../../../common/polly-logo";
import { HomeProps } from "./home";
import { EMainDisplay } from "../constant";


const Header: React.FC<HomeProps> = (props) => {
  const { actionHandler, valueHandler } = props
  const { setMainView, setMenuActive } = actionHandler
  const { menuActive } = valueHandler
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)
  const history = useHistory();

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const backToCameraHandler = () => {
    setMenuActive({
      back_to_camera: true,
      favorites: false,
      photos: false,
      videos: false,
      home:false
    })
    history.push(routes.camera);
  }

  const homeHandler = () => {
    setMenuActive({
      back_to_camera: false,
      favorites: false,
      photos: false,
      videos: false,
      home:true
    })
    setMainView(EMainDisplay.MyHome)

  }

  const photoHandler = () => {
    setMenuActive({
      back_to_camera: false,
      favorites: false,
      photos: true,
      videos: false,
      home:false
    })
    setMainView(EMainDisplay.MyPhoto)
  }
  const videoHandler = () => {
    setMenuActive({
      back_to_camera: false,
      favorites: false,
      photos: false,
      videos: true,
      home:false
    })
    setMainView(EMainDisplay.MyVideo)
  }
  const favoriteHandler = () => {
    setMenuActive({
      back_to_camera: false,
      favorites: true,
      photos: false,
      videos: false,
      home:false
    })
    setMainView(EMainDisplay.MyFavorite)
  }

  const isOpen = menuActive.videos || menuActive.photos || menuActive.favorites

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              {/* <p>{menuCollapse ? "Logo" : "Big Logo"}</p> */}

              <img style={{
                width: '120px',
                padding: '15px',
                marginLeft: '75px'
              }} src={pollyLogo} alt="" />
            </div>
          </SidebarHeader>
          <SearchBar />
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<ImExit size={50} />} active={menuActive.back_to_camera} onClick={backToCameraHandler}>
                Back to Camera
              </MenuItem>
              <MenuItem icon={<IoHomeOutline size={50} />} active={menuActive.home} onClick={homeHandler}>
                Im Home
              </MenuItem>
              <SubMenu title="My album" open={isOpen} onOpenChange={photoHandler} icon={<HiOutlinePhotograph size={50} />}>
                <MenuItem icon={<IoIosPhotos />} onClick={photoHandler} active={menuActive.photos}>Photos</MenuItem>
                <MenuItem icon={<MdVideoLibrary />} onClick={videoHandler} active={menuActive.videos}>Videos</MenuItem>
                <MenuItem icon={<MdFavoriteBorder />} onClick={favoriteHandler} active={menuActive.favorites}>Favorites</MenuItem>
              </SubMenu >
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;