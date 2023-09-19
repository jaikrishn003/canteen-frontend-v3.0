import React, { useEffect, useState } from 'react'

import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

//Firebase config imports
import { Auth } from '../../ServerDetails/firebaseConfig'
import AdminId from '../../ServerDetails/adminId'
//********************** */

//Import other views

import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader'

//************ */

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    useToast ,
    Stack,
    Button,
    Heading,
    Text,
    
  } from '@chakra-ui/react'

const Login = () => {

    const toast = useToast()

    const[isPageLoading, setIsPageLoading]=useState(true)

    const[adminEmail, setadminEmail]=useState("")
    const[adminPassword, setadminPassword]=useState("")

    const[isButtonLoading, setisButtonLoading]=useState(false)

    const handleSubmit = async()=>{
        setisButtonLoading(true)
        if((adminEmail === "") || (adminPassword === "")){
            setisButtonLoading(false)
            toast({
                title:"Email or Password empty",
                status:'error',
                isClosable:true,
                position:'top'
            })
        }else{
            signInWithEmailAndPassword(Auth, adminEmail, adminPassword)
                .then((userData)=>{
                    window.location.href = "/admin/home"
                }).catch((error)=>{
                    setisButtonLoading(false)
                    toast({
                        title:"Error",
                        description:error,
                        status:'error',
                        isClosable:true,
                        position:'top'
                    })
                })
        }
        
    }

    useEffect(()=>{
        onAuthStateChanged(Auth, (user)=>{
            if(user){
                if(user.uid === AdminId){
                    window.location.href="/admin/home"
                }
                else{
                    window.location.href = "/"
                }
            }else{
                setIsPageLoading(false)
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
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your Admin Account</Heading>
            
          </Stack>
          <Box
            rounded={'lg'}
            
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Admin Email address</FormLabel>
                <Input type="email" value={adminEmail} onChange={(e)=>setadminEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={adminPassword} onChange={(e)=>setadminPassword(e.target.value)} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  
                  <Text color={'blue.400'}>Forgot password?</Text>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={()=>handleSubmit()}
                  isLoading={isButtonLoading}
                  >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    }
   </>

  )
}

export default Login