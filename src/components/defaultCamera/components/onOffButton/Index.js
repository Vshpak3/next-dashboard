import React,{useState} from 'react'
import Unlock from "../../../assets/unlock.png";
import lock from "../../../assets/lock.png";
import "../../../assets/style.css"
import StartDetecting from "../../../assets/onfrontcamera.png";

const OnOffButton = (props) => {
  const {
  
    lockIcon,
    onToggle
  } = props

  console.log(onToggle,"onToggleonToggle")
  const[toggle,setToogle]=useState(false)
  return (
    <div className="btn-polly-logo"
      style={{
        position: 'absolute',
        right: '25%',
        top: '2%',
        height: '100px',
        width: '185px',
        display: 'flex',
        justifyContent: 'center',
        background: !lockIcon ? '#ED157F': '#5757578c',
        borderRadius: '30px',
        padding: '20px 40px 20px 50px',
        cursor: 'pointer',
        zIndex: 1,
      }}
      
    >
      <div onClick={() => {onToggle(); setToogle(!toggle)}}>
          {/* {toggle===false ? <h1>Off</h1> : <h1>On</h1> } */}
          <img style={{width:'80px', height:'80px'}} src={toggle===false ? Unlock : lock} alt="" />
        
      </div>
    </div>
  )
}

export default OnOffButton