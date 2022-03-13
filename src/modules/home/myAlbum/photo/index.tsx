import React from 'react'
import { HomeProps } from '../../myHome/home'
import MainHeader from '../components/mainHeader'
import SubHeader from '../components/subHeader'

const mockData = [
  'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxN5QtpWsLuJ_qi-ESTGROqSINRi3Er4sne9uG2oEXT6NB9QjSM3lAPbTSr_erccn-W0&usqp=CAU',
  'https://www.educationcorner.com/images/featured-test-taking-strategies.jpg',
  'https://www.outbrain.com/techblog/wp-content/uploads/2017/05/road-sign-361513_960_720.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4zzmYPziDaPnCMvz2LfEYZ49vkJQh7PDCp_cTAdoTJzNJCcMQxdyyH2nOAD0gMkYkzMc&usqp=CAU'
]


const myPhoto: React.FC<HomeProps> = (props) => {
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
        {
          mockData.map(item => {
            return (
              <img src={item} style={{
                padding: '1%',
                width: '300px',
                height: '300px'
              }} alt="" />
            )
          })
        }
      </div>
    </div>
  )
}

export default myPhoto