import React from 'react'
import { EMainDisplay } from '../../constant'
import { HomeProps } from '../../myHome/home'

const subHeader: React.FC<HomeProps> = (props) => {
  const { valueHandler } = props
  return (
    <div style={{
      padding: "1%",
      fontSize: "20px",
      position: "relative",
    }}>
      {valueHandler?.mainView === EMainDisplay.MyPhoto ? 'Photos' : ''}
      {valueHandler?.mainView === EMainDisplay.MyVideo ? 'Videos' : ''}
      {valueHandler?.mainView === EMainDisplay.MyFavorite ? 'Favorites' : ''}
    </div >
  )
}

export default subHeader