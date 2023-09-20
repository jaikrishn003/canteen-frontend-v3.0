import React, { useEffect, useState } from 'react'

//Chakra imports
import {
    Grid,
    GridItem,
    Input,
    Heading,
    Divider,
    Text,
    Textarea,
    Button,
    Tooltip,
    Spinner,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'





// Pages import



import { Auth, App } from '../../ServerDetails/firebaseConfig'

import { onAuthStateChanged } from 'firebase/auth'

import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader'

import AdminId from '../../ServerDetails/adminId'

import Sidebar from '../../Extras/Sidebar/Sidebar'




import { getDatabase, ref, onValue,set } from 'firebase/database'



const Settings = () => {


    const[acceptOrders, setacceptOrders]=useState()

    


    const[isPageLoading, setIsPageLoading]=useState(true)

    
    const database = getDatabase(App)
    

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
        const getValues = ref(database, "settings")
        onValue(getValues, (snapshot)=>{
            const data = snapshot.val()

            setacceptOrders(data.accept_orders)
        })
    })



    const toast = useToast()

   


      const[buttonLoading, setbuttonLoading]=useState('')



      const setAcceptOrders = ()=>{
        const changeValuesOrders = ref(database, `settings/accept_orders`)
        
        set(changeValuesOrders,!acceptOrders).then(()=>{}).catch((error)=>console.log(error))
      }


    if(isPageLoading){
        return(
            <div style={{display:"flex",alignItems:"center", justifyContent:"center", height:"100vh"}}>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl' 
            />
            
          </div>
          )
    }else{
        return (
            <Sidebar  children={
                <div>
                    <Heading size='3xl'>Settings</Heading>
                    
                    
                    <div style={{maxWidth:"230px",marginTop:"10px", marginLeft:"10px"}}>
                        <Heading  size='lg'>Controls</Heading>
                        <Divider height='3px'/>
                    </div>
                    <Grid style={{marginTop:"10px", marginLeft:"10px"}} templateColumns='repeat(2,1fr)' gap={3}>
        
                        {/* <GridItem w='100%' h='20'>
                            <Text fontSize='xl' fontWeight='bold'>Enable Accepting Orders</Text>
                        </GridItem> */}
                        {/* <GridItem w='100%' h='20'>
                            <Button variant={'solid'} colorScheme={'green'}>{'Enabled'}</Button>
                        </GridItem> */}
        
                        <GridItem w='100%' h='20'>
                        <Tooltip label='Set interval for accepting orders online'>
                            <Text fontSize='xl' fontWeight='bold'>Accept Orders <Button colorScheme='white' textColor='black'></Button></Text>
                        </Tooltip>
                        </GridItem>
                        <GridItem w='100%' h='20'>
                            {/* <Button variant={'solid'} colorScheme={'green'}>{hotelInfo.acceptOrders.toString()}</Button> */}
                            <Tooltip label={`Click to change to ${!(acceptOrders)}`}>
                                <Button colorScheme='white'>
                                    <Text onClick={()=>setAcceptOrders()} textColor='black' fontWeight={'bold'}>{acceptOrders ? "Enabled" : "Disabled" } </Text>
                                </Button>
                            </Tooltip>
                        </GridItem>
        

                                
        
                       
        
        
        
{/*         
                        <GridItem w='100%' h='20'>
                        <Tooltip label='Set time to reset stocks to default'>
                            <Text fontSize='xl' fontWeight='bold'>Auto Reset Time  <Button colorScheme='white' textColor='black'><QuestionIcon/></Button></Text>
                        </Tooltip>
                        </GridItem>
                        <GridItem w='100%' h='20'>
                            <Button onClick={autoResetStockonOpen} variant={'solid'} colorScheme={'green'}>{'Change Timings'}</Button>
                            <Tooltip style={{marginLeft:"5px"}} label='Click to change timings'>
                                <Button colorScheme='white'>
                                    <Text textColor="black"  fontWeight={'bold'}>@ {hotelInfo.reset_Time}</Text>
                                </Button>
                            </Tooltip>
                        </GridItem> */}
        
                    </Grid>
        
        
                    



                </div>
            } />
          )
    }
  
}

export default Settings