import React, { useEffect, useState } from 'react'

import { Auth } from '../../ServerDetails/firebaseConfig'

import { onAuthStateChanged } from 'firebase/auth'

import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader'

import AdminId from '../../ServerDetails/adminId'

import Sidebar from '../../Extras/Sidebar/Sidebar'

const Orders = () => {
    const[isPageLoading, setIsPageLoading]=useState(true)


    useEffect(()=>{
        onAuthStateChanged(Auth, (user)=>{
            if(user){
                if(user.uid === AdminId){
                    setIsPageLoading(false)
                }else{
                    window.location.href = "/"
                }
            }else{
                window.location.href = "/admin/login"
            }
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
                <Sidebar children={
                    <>
                        Orders
                    </>
                }/>
            </>
        }
    </>
  )
}

export default Orders