import React from 'react'
import { HomeProps } from '../../myHome/home'

const subHeader: React.FC<HomeProps> = (props) => {
  const { valueHandler } = props
  return (
    <div>
      {valueHandler?.mainView ?? ''}
    </div>
  )
}

export default subHeader