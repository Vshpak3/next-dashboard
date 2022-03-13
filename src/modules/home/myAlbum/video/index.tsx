import React from 'react'
import { HomeProps } from '../../myHome/home'
import MainHeader from '../components/mainHeader'
import SubHeader from '../components/subHeader'

const myVideo:React.FC<HomeProps> = (props) => {
  return (
    <div style={{
      padding:'1%'
    }}>
      <MainHeader />
      <SubHeader {...props} />
      <div style={{
        overflowY: 'scroll',
        padding:'1%',
        border: '1px solid red',
        float: 'left',
        height: '800px',
        position: 'relative'
      }}>
        Videos
      </div>
    </div>
  )
}

export default myVideo