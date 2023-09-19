import React, { useEffect, useState } from 'react'

import { Auth,App } from '../../ServerDetails/firebaseConfig'

import { onAuthStateChanged } from 'firebase/auth'

import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader'

import TopbarClient from '../ClientExtra/TopbarClient/TopbarClient'
import BottomNavbar from '../ClientExtra/BottomNavbar/BottomNavbar'



import { getDatabase,ref,onValue } from "firebase/database";

import Menulistview from '../ClientExtra/MenuListView/Menulistview'

import {
    Input,
    InputGroup, 
    InputLeftElement,
    InputRightElement,
    Button,
    Divider,
    Text,
    Box,
    useDisclosure,
    
   } from '@chakra-ui/react';

const ClientHome = () => {

    const[isPageLoading,setIsPageLoading]=useState(true)

    const[userdisplayName, setdisplayName]=useState("")


    const[menuData, setMenuData]=useState({})

    const database = getDatabase(App)

    const menuRef = ref(database, 'menu');


    // const toast = useToast()

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



    useEffect(()=>{
        const unbuscribe = onValue(menuRef, (snapshot)=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                console.log(data)
                setMenuData(data)
            }
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
            <TopbarClient content={userdisplayName} />




            <Box>
                {
                    Object.keys(menuData).map((itemName)=>(
                        <>
                        <Menulistview 
                        key={itemName}
                            itemUrl={menuData[itemName].item_image}
                            itemName={menuData[itemName].item_name}
                            itemCutprice={menuData[itemName].item_price}
                            offerPrice={menuData[itemName].item_cut_price}
                            item_amount={menuData[itemName].item_stock}
                            item_Avl={menuData[itemName].item_avl}

                        />
                          <Divider my='4' borderColor={'#EEF6FD'} borderWidth={'1px'}/>

                        </>
                        
                        
                    ))
                }
            </Box>
            <BottomNavbar/>
        </>
    }
    </>
  )
}

export default ClientHome