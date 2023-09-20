import React, { useEffect, useState } from 'react'

import { App, Auth } from '../../ServerDetails/firebaseConfig'

import { onAuthStateChanged } from 'firebase/auth'

import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader'

import AdminId from '../../ServerDetails/adminId'

import Sidebar from '../../Extras/Sidebar/Sidebar'

import { getDatabase,ref,onValue, child,get, set } from 'firebase/database'

import {
    
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Input,
    Box,
    Flex,
    Image,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    TableContainer
  } from '@chakra-ui/react';

  
  

const Staffs = () => {

    const[isPageLoading, setIsPageLoading]=useState(true)
    const[userId, setuserId]=useState("")

    const[staffsData, setStaffsData]=useState([])

    const[staffEmail, setStaffEmail]=useState("")
    const[staffPassword, setStaffPassword]=useState("")

    const[isButtonLoading, setbuttonisLoading]=useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()


    const database = getDatabase(App)

    useEffect(()=>{
        onAuthStateChanged(Auth, (user)=>{
            if(user){
                if(user.uid === AdminId){
                    setuserId(user.uid)
                    setIsPageLoading(false)
                }else{
                    window.location.href = "/"
                }
            }else{
                window.location.href = "/admin/login"
            }
        })
    })

    useEffect(()=>{
        const staffsRef = ref(database, "staffs")

        get(staffsRef).then((snapshot)=>{
            if(snapshot.exists()){
                const existingValue = snapshot.val()
                console.log(existingValue)
                setStaffsData(existingValue)
            }
        })
    },[database])


    const addNewStaff = ()=>{

        setbuttonisLoading(true)
        
        const staffsRef = ref(database, "staffs")

        get(staffsRef).then((snapsho)=>{
            
            if(snapsho.exists()){
                const existingData = snapsho.val()
                
                const newData = [
                    ...existingData,
                    staffEmail
                ]

                console.log(newData)

                set(staffsRef, newData)
                .then(()=>{
                    window.location.reload()
                }).catch((error)=>{
                    alert(error)
                })
                
            }
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
                <Sidebar children={
                    <>
                          <Box p={4}>
                    <Flex justify="space-between" mb={4}>
                      <Button  colorScheme="blue" onClick={onOpen}>
                        + Add New Staff
                      </Button>
                    </Flex>
                    <TableContainer>

                    
                    <Table variant='simple'>
                        <Thead>
                            <Th>Email</Th>
                        </Thead>

                        <Tbody>
                        {staffsData.map((item, key)=>(
                        <Tr key={key}>
                            {item}
                        </Tr >
                    ))}
                        </Tbody>
                    </Table>
                    </TableContainer>
                    
                  </Box>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Add Staff Data</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder='email' type='email' value={staffEmail} onChange={(e)=>setStaffEmail(e.target.value)}/>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                        <Button variant='ghost' isLoading={isButtonLoading} onClick={()=>addNewStaff()}>Secondary Action</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
                    </>
                }/>
            </>
        }
    </>
  )
}

export default Staffs