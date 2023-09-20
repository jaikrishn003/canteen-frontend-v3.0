import React from 'react'

import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, HStack, VStack,  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Grid,
    GridItem,
    Input,
    Box,
    Spacer,
    useToast,
    Flex, 
    
  } from '@chakra-ui/react'

    

import {
    BsFillCartPlusFill
} from "react-icons/bs"

import "./Menulistview.css"
import { useEffect } from 'react'
import { useState } from 'react'

const Menulistview = (props) => {

  const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const itemName = props.itemName
    const itemClass = props.itemClass
    const itemCutprice = props.itemCutprice
    const offerPrice = props.offerPrice
    const itemImage = props.itemImage

    const[itemCount, setitemCount]=useState(1)
    const[itemGrand, setitemGrand]=useState(props.offerPrice)
    
    useEffect(()=>{
      // setitemGrand(parseInt(props.offerPrice))
    })
    
    
    const increment =()=>{
      setitemCount((prevCount) => {
        const newCount = prevCount + 1;
        setitemGrand(newCount * props.offerPrice);
        return newCount;
      });

    }


    const addToCart=()=>{
      const preStoredData = JSON.parse(localStorage.getItem('Menu'))
      const itemData = [{id:props.itemName, count:itemCount}]
      if(preStoredData){
        const existingItemIndex = preStoredData.findIndex(item => item.id === props.itemName)
        if(existingItemIndex >= 0){
          // Item with same id already exists, update the count
          preStoredData[existingItemIndex].count = itemCount
          localStorage.setItem('Menu', JSON.stringify(preStoredData))
        } else {
          // Item does not exist, add a new object to the array
          const updatedData = [...preStoredData, ...itemData]
          localStorage.setItem('Menu', JSON.stringify(updatedData))
        }
      } else {
        // No existing data, add a new object to the array
        localStorage.setItem('Menu', JSON.stringify(itemData))
      }
      
      toast({
        title:"Item Added To Cart",
        status:'success',
        isClosable:true,
        position:'bottom'
      })
      
      
      onClose()
    }
    

    const decrement=()=>{
      if(itemCount >1){
        setitemCount((prevCount) => {
          const newCount = prevCount - 1;
          setitemGrand(newCount * props.offerPrice);
          return newCount;
        });
      }
    }

    

  return (
        <div className='card-view' >
      <Flex justifyContent='flex-start' style={{marginTop:"15px"}}>
      <Box p='2'>
        {props.item_amount == 0 || props.item_Avl === false  ?
        <Image
        className="card-image"
        borderRadius="10px"
        boxSize="50px"
        src={props.itemUrl}
        style={{ filter: 'grayscale(100%)' }}
      />
          :
          <Image className="card-image" borderRadius="10px" boxSize="50px" src={props.itemUrl} />

          
        }

        
      </Box>
      <p className="card-item-name" >{itemName}</p>
      

      <Box>
      <VStack >
              {/* <p className="card-item-cat">{itemClass}</p> */}
      </VStack>
      </Box>
      </Flex>
      <Spacer />

      <Flex style={{marginTop:"15px"}} justifyContent='flex-start'>
      <Box >
      <HStack p={4}>
            <VStack>
              <Text fontSize="10px">
                Was<Text fontSize="10px" textDecoration="line-through">₹{itemCutprice}</Text>
              </Text>
            </VStack>
            <Text fontSize="10px">Now@</Text>
            <Text style={{ marginLeft: "3px" }} fontSize="2xl" color="green.600">
              ₹{offerPrice}
            </Text>
            

            {props.item_amount ===0 || props.item_Avl === false ?
            <Text color="red.500">Out Of stock</Text>
            :
            <Button onClick={onOpen} variant="solid" colorScheme="green">
            {<BsFillCartPlusFill />}
          </Button>
           
            }

            {/* TODO */}
            {/* <Button onClick={onOpen} variant="solid" colorScheme="green">
              {<BsFillCartPlusFill />}
            </Button> */}
          </HStack>
      </Box>

    </Flex>
    


            
                {/* <Image className='card-image' borderRadius='10px' boxSize='80px' src='https://bit.ly/dan-abramov'/>
                <Text className='card-item-name'>Sample text goes here</Text> */}


    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>More</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align={'start'}>
            

            <div className='modal-view'>
              <Image className='model-items' boxSize={'50px'} src={props.itemUrl}/>
              <div className='model-items'>
                <Text  marginLeft={'20px'} fontSize='2xl' fontWeight={'bold'}>{props.itemName}</Text>
                
              </div>
              
              <Text className='model-items' textDecoration='line-through' marginLeft={'30px'}>₹{props.itemCutprice}</Text>
              <Text className='model-items' marginLeft={'10px'} textColor={'green.400'} fontSize={'3xl'}>₹{props.offerPrice}/-</Text>
            </div>
            <div style={{marginTop:"20px"}} className='modal-view-s'>

                <VStack align={"start"}>
                  {/* <Text fontSize={'xl'}>Quantity</Text> */}

                  <HStack>
                    <Button onClick={decrement}>-</Button>
                    <Input
                        textAlign={'center'}
                        // htmlSize={'1'}
                        width={'auto'}
                        
                        value={itemCount}
                        onChange={(e) => setitemCount(parseInt(e.target.value))}
                        type="number" // Set input type to "number" if you're expecting numeric input
                        min="0" // Set minimum value if needed
                        step="1"
                      />
                    <Button onClick={increment} >+</Button>

                    
                  </HStack>
                  <Text  fontSize={"2xl"}>Total:</Text>
                    <Text fontSize={'4xl'}>₹{itemGrand}</Text>
                </VStack>

            </div>

              {/* <HStack spacing={'10px'}>
                <Image boxSize={'80px'} src='https://bit.ly/dan-abramov'/>
                <VStack>
                  <HStack spacing={'20px'}>
                    <Text fontSize='2xl' fontWeight={'bold'}>{props.itemName}</Text>
                    <Text>{props.itemCutprice}</Text>
                  </HStack>
                  
                  <Text>Class: {props.itemClass}</Text>
                </VStack>


                
                
              </HStack> */}
              
            </VStack>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={addToCart}>
              Add to cart
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </div>
  )
}

export default Menulistview