import React from 'react'

import { 
    Box,
    Heading,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,  
    ModalCloseButton,
    useDisclosure

} from '@chakra-ui/react'

// import QRCode from 'qrcode.react'

const ExtraOrders = ({order}) => {

    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleShowDetails = () => {
        onOpen();
    }

  return (
    <Box borderWidth="1px" borderRadius="lg" padding="4">
    <Text fontSize="lg">Order ID: </Text>
    <Text fontWeight={'bold'}>{order.order_id}</Text>
   
    {/* <Text>{order.date}</Text> */}
    {/* Show items */}
    
    <Button colorScheme="blue" size="sm" onClick={handleShowDetails}>
      Show QR
    </Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Text fontSize="lg">Order ID: </Text>
        <Text fontWeight={'bold'}>{order.order_id}</Text>
          {/* <Text>Customer: {order.customer}</Text> */}
          {/* <Text>Date: {order.date}</Text> */}
          {/* Show items in the modal */}
          <Box mt="2">
            <Text fontWeight="bold">Items:</Text>
            <ul>
              {order.order_items.map((item) => (
                <li key={item.item_id}>
                {item.item_amount} x {item.item_id} = {item.item_price}
              </li>
              ))}
            </ul>
          </Box>
          <Box alignContent={'center'} justifyContent={'center'} mt="5">
            
            <Text fontWeight="bold">QR Code:</Text>
            {/* <QRCode value={order.order_id} /> */}
            <Text color={'red'}>Kindly don't share this QR code.</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  </Box>
  )
}

export default ExtraOrders