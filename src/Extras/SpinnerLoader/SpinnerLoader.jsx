import React from 'react'

import { Spinner } from '@chakra-ui/react'

const SpinnerLoader = () => {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
        <Spinner style={{width:"50px", height:"50px"}}/>
    </div>
  )
}

export default SpinnerLoader