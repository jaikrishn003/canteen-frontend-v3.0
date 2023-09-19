import React, { useEffect, useState } from 'react'

import { Auth, App } from '../../ServerDetails/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

import TopbarClient from '../ClientExtra/TopbarClient/TopbarClient'
import BottomNavbar from '../ClientExtra/BottomNavbar/BottomNavbar'

import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader'

import { getDatabase, ref, onValue } from 'firebase/database'

const MyOrders = () => {

    const[isPageLoading, setIsPageLoading]=useState(true)
    const[userdisplayName, setdisplayName]=useState("")


    useEffect(()=>{
        onAuthStateChanged(Auth, (user)=>{
            if(user){
                setdisplayName(user.displayName)
                setIsPageLoading(false)
                
            }else{
                window.location.href = "/login"
            }
        })
    },[Auth])

  return (
    <>
        {
            isPageLoading
            ?
            <SpinnerLoader />
            :
            <>
                <TopbarClient content={userdisplayName} />

                <BottomNavbar/>

            </>
        }
    </>
  )
}

export default MyOrders