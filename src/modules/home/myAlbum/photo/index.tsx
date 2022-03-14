import React from 'react'
import { HomeProps } from '../../myHome/home'
import MainHeader from '../components/mainHeader'
import SubHeader from '../components/subHeader'
//@ts-ignore
import Gallery from 'react-grid-gallery';
// const mockData = [
//   'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxN5QtpWsLuJ_qi-ESTGROqSINRi3Er4sne9uG2oEXT6NB9QjSM3lAPbTSr_erccn-W0&usqp=CAU',
//   'https://www.educationcorner.com/images/featured-test-taking-strategies.jpg',
//   'https://www.outbrain.com/techblog/wp-content/uploads/2017/05/road-sign-361513_960_720.jpg',
//   'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4zzmYPziDaPnCMvz2LfEYZ49vkJQh7PDCp_cTAdoTJzNJCcMQxdyyH2nOAD0gMkYkzMc&usqp=CAU'
// ]

const IMAGES =
  [{
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    caption: "After Rain (Jeshu John - designerspics.com)"
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [{ value: "Ocean", title: "Ocean" }, { value: "People", title: "People" }],
    caption: "Boats (Jeshu John - designerspics.com)"
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    caption: "After Rain (Jeshu John - designerspics.com)"
  },
  {
    src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 183,
    caption: "37H (gratispgraphy.com)"
  },
  {
    src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
    thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
    thumbnailWidth: 271,
    thumbnailHeight: 320,
    caption: "Orange Macro (Tom Eversley - isorepublic.com)"
  },
  {
    src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: "201H (gratisography.com)"
  },
  {
    src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
    thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
  },
  {
    src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
    thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: "Man on BMX (Tom Eversley - isorepublic.com)"
  },
  {
    src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
    thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: "Ropeman - Thailand (Tom Eversley - isorepublic.com)"
  },
  {
    src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
    thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
    thumbnailWidth: 257,
    thumbnailHeight: 320,
    caption: "A photo by 贝莉儿 NG. (unsplash.com)"
  }
  ]

const myPhoto: React.FC<HomeProps> = (props) => {
  return (
    <div style={{
      padding: '1%',
      width: '100%'
    }}>
      <MainHeader />
      <SubHeader {...props} />
      <Gallery images={IMAGES} enableImageSelection={false} />
      {/* <div style={{
        overflowY: 'scroll',
        padding: '1%',
        // border: '1px solid red',
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
      </div> */}
    </div>
  )
}

export default myPhoto