//import useState hook to create menu collapse state
import React, { useState } from "react";

import SearchBar from '../components/search'
import { useHistory } from "react-router-dom";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FiLogOut } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { ImExit } from "react-icons/im";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "../components/css/header.css";
import { routes } from "../../app/contants";


const Header: React.FC<any> = () => {

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)
  const history = useHistory();
  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
            {/* <div className="closemenu" onClick={menuIconClick}> */}
            {/* changing menu collapse icon on click */}
            {/* {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )} */}
            {/* </div> */}
          </SidebarHeader>
          <SearchBar />
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<ImExit size={50} />} active={true} onClick={() => {
                history.push(routes.camera);
              }}>
                Back to Camera
              </MenuItem>
              <MenuItem icon={<HiOutlinePhotograph size={50} />}>My Album</MenuItem>
              {/* <Menu>
                <MenuItem >Favourite</MenuItem>
                <MenuItem >Author</MenuItem>
                <MenuItem >Settings</MenuItem>
              </Menu> */}
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