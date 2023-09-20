import React, { useEffect, useState } from 'react'

import { Auth, App } from '../../ServerDetails/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

import TopbarClient from '../ClientExtra/TopbarClient/TopbarClient'
import BottomNavbar from '../ClientExtra/BottomNavbar/BottomNavbar'

import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader'

import { getDatabase, ref, onValue } from 'firebase/database'

import ExtraOrders from '../../Extras/ExtraOrders/ExtraOrders'

const MyOrders = () => {

    const[isPageLoading, setIsPageLoading]=useState(true)
    const[userdisplayName, setdisplayName]=useState("")
    const[userId, setUserId]=useState("")

    const database = getDatabase(App)

    const[orders, setOrders]=useEffect([])


    useEffect(()=>{
        onAuthStateChanged(Auth, (user)=>{
            if(user){
                setdisplayName(user.displayName)
                setUserId(user.uid)
                setIsPageLoading(false)
                
            }else{
                window.location.href = "/login"
            }
        })
    },[Auth])

    useEffect(()=>{
        const userOrderRef = ref(database, `/users/${userId}`)

        onValue(userOrderRef, (snaphsot)=>{
            
        })
    })

  return (
    <>
        {
            isPageLoading
            ?
            <SpinnerLoader />
            :
            <>
                <TopbarClient content={userdisplayName} />

                {/* <ExtraOrders /> */}

                <BottomNavbar/>

            </>
        }
    </>
  )
}

export default MyOrders