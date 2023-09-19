import React, { useEffect, useState } from 'react'

import { Auth, App } from '../../ServerDetails/firebaseConfig'

import { onAuthStateChanged } from 'firebase/auth'

import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader'

import AdminId from '../../ServerDetails/adminId'

import Sidebar from '../../Extras/Sidebar/Sidebar'


import Stafforder from '../../Extras/OrdersAdmin/OrdersAdmin'

import { getDatabase, ref, onValue } from 'firebase/database'


const Orders = () => {
    const[isPageLoading, setIsPageLoading]=useState(true)

    const[orderData, setorderData]=useState([])

    const database = getDatabase()

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
    },[Auth])


    useEffect(()=>{
        const orderRaw = ref(database, "users")
        onValue(orderRaw, (snapshot)=>{
            const data = snapshot.val()
            const orders = Object.keys(data).map((userId)=>{
                const userOrders = data[userId]
                return userOrders
            })

            // data.foreach((userId)=>{
            //     console.log(userId)
            //     console.log(data[userId])
            // })

            // console.log(typeof(data))
            

            
            
            

            
            setorderData(<Stafforder order={orders}/>)
        })
    },[database])

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
                        {orderData}
                    </>
                }/>
            </>
        }
    </>
  )
}

export default Orders