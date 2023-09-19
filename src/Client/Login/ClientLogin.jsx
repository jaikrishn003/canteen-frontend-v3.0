import React, { useEffect, useState } from 'react'

import { Auth } from '../../ServerDetails/firebaseConfig'

import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader'

import {
    Flex,
    Box,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Center,
    useToast
  } from '@chakra-ui/react';

  import { FcGoogle } from 'react-icons/fc';



const ClientLogin = () => {

    const[isPageLoading,setIsPageLoading]=useState(true)

    const toast = useToast()

    useEffect(()=>{
        onAuthStateChanged(Auth, (user)=>{
            if(user){
                window.location.href = "/"
            }else{
                setIsPageLoading(false)
            }
        })
    },[Auth])


    const signIn =()=>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(Auth, provider)
          .then((result)=>{
            window.location.href="/"
          }).catch((error)=>{
            toast({
                 title:"Error",
                        description:error.code,
                        status:'error',
                        isClosable:true,
                        position:'top'
            })
          })
      }
    

  return (
    <>
    {
        isPageLoading
        ?
        <SpinnerLoader />
        :
        <>
             <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Heading fontSize={'6xl'}>Start ordering</Heading>
                    <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign In Or Register to start ordering</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        with fast Authentication system provided by<Link href='https://myaccount.google.com/security' color={'blue.400'}> Google</Link> 
                    </Text>
                    </Stack>
                    <Box
                    rounded={'lg'}
                    
                    boxShadow={'lg'}
                    p={8}>
                    <Stack onClick={signIn} spacing={4}>
                    <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
                    <Center>
                        <Text>Sign in with Google</Text>
                    </Center>
                    </Button>

                    {/* <Link fontSize={'xs'} color={'blue.400'}>Why Signing In?</Link> */}
                    </Stack>
                    </Box>
                </Stack>
                </Flex>
        </>
    }
    </>
  )
}

export default ClientLogin