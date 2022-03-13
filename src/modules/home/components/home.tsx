import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MyFavorite, MyPhoto, MyVideo } from '..'
import Header from '../components/header'
import '../components/css/home.css'
import { EMainDisplay } from "../constant";

export interface IMainViewActive {
  back_to_camera: boolean,
  photos: boolean, // Default
  videos: boolean,
  favorites: boolean,
  home:boolean
}
export interface IActionHandler {
  setMainView: (args: EMainDisplay) => any
  setMenuActive: (args: IMainViewActive) => any
}

export interface IMainViewProp {
  menuActive: IMainViewActive
  mainView: EMainDisplay
}
export interface HomeProps {
  actionHandler: IActionHandler
  valueHandler: IMainViewProp
}


const Home: React.FC<any> = () => {
  const location:any = useLocation()
  const [mainView, setMainView] = useState<EMainDisplay>(EMainDisplay.MyHome)
  const [menuActive, setMenuActive] = useState<IMainViewActive>({
    back_to_camera: false,
    photos: false, // Default
    videos: false,
    favorites: false,
    home:true
  })

  useEffect(() => {
    if(location?.state?.main_view) {
      setMainView(location?.state?.main_view)
    }
    if(location?.state?.default_clicked) {
      setMenuActive(location?.state?.default_clicked)
    }
  } , [location])

  const actionHandler = {
    setMainView,
    setMenuActive
  }

  const valueHandler = {
    mainView,
    menuActive
  }

  const mainRender = () => {
    switch (mainView) {
      case EMainDisplay.MyHome:
        return <div>HOME</div>
      case EMainDisplay.MyPhoto:
        return <MyPhoto />
      case EMainDisplay.MyVideo:
        return <MyVideo />
      case EMainDisplay.MyFavorite:
        return <MyFavorite />

      default:
        return <div>DEFAULT</div>
    }
  }

  return (
    <>
      <div className="polly-home">
        <Header actionHandler={actionHandler} valueHandler={valueHandler} />
        <div>
          {mainRender()}
        </div>
      </div>
    </>
  );
};

export default Home