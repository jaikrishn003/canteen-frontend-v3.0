import React from 'react'

import "./Menulistview.css"
import { Box, Button, Flex,HStack,Image,Spacer,Text, VStack } from '@chakra-ui/react'

const ItemList = (props) => {

    const removeId = ()=>{
        const data = JSON.parse(localStorage.getItem("Menu")) || []
        const indexToDelete = data.findIndex(item => item.id === props.name)

        if(indexToDelete !=-1){
            const updatedData = [
                ...data.slice(0,indexToDelete),
                ...data.slice(indexToDelete+1)
            ]
            localStorage.setItem("Menu", JSON.stringify(updatedData))
        }
        window.location.reload()
      }

  return (
    <div  className='card-view'>
        <Flex justifyContent='flex-start'>
            <Box style={{marginTop:"20px"}}>
                {props.item_stock == 0 || props.availability === 'false' ?
                <Image className='card-image' borderRadius='10px' boxSize='50px' src={props.imgUrl} style={{ filter: 'grayscale(100%)' }}/>:
                 <Image className='card-image' borderRadius='10px' boxSize='50px' src={props.imgUrl} />
                }
            </Box>

            <Box marginLeft={"20px"}  style={{marginTop:"20px"}}>
                <h3 className="card-item-name">{props.name}</h3>
            </Box>
            <Box marginLeft={"35px"} marginTop={"30px"}>
                {/* <h3 className="card-item-name">X 2</h3>  */}
                {/* <Text fontSize={'xl'}>X {props.count}</Text> */}
            </Box>
        </Flex>
        <Spacer/>
        <Flex marginTop={'20px'} marginRight={'15px'}>
        
            <VStack>
                <HStack>
                    <Text fontSize={'sm'}>{props.count}items,</Text>
                    <h3 className="card-item-name">₹{props.amount}</h3>
                </HStack>
            
            <Button onClick={removeId} variant={'link'} colorScheme='red'><Text fontSize={'xs'}>Remove Item</Text></Button>
            </VStack>
        </Flex>
    </div>
  )
}

export default ItemList