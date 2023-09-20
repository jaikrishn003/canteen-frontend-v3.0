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

import QRCode from 'qrcode.react'

const ExtraOrders = ({order}) => {

    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleShowDetails = () => {
        onOpen();
    }

  return (
    <Box key={`boxKeys${order.order_id}`} borderWidth="1px" borderRadius="lg" padding="4"  marginTop={"5px"}>
    <Text fontSize="lg">Order ID: </Text>
    <Text fontWeight={'bold'}>{order.order_id}</Text>
   
    {/* <Text>{order.date}</Text> */}
    {/* Show items */}
    
    <Button colorScheme="blue" size="sm" onClick={handleShowDetails}>
      Show QR
    </Button>

    <Modal isOpen={isOpen} onClose={onClose} size={'md'} key={`modalkey${order.order_id}`}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="md">Order ID:</Text>
          <Text fontWeight="bold">{order.order_id}</Text>
          <Box mt="2">
            <Text fontWeight="bold">Items:</Text>
            <ul key={`ulKeys${order.order_id}`}>
              {order.order_items.map((item) => (
                <li key={item.item_id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{item.count} x {item.item_name} -</span>
                    {item.order_status ? (
                      <Text color={'green'}> Delivered</Text>
                    ) : (
                      <Text color={'yellow.300'}> Pending</Text>
                    )}
                  </div>

                </li>
              ))}
            </ul>
          </Box>
          <Box textAlign="center" mt="5">
            <Text fontWeight="bold">QR Code:</Text>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <QRCode value={order.order_id} size={300} />
            </div>
            <Text color="red" mt="2">
              Kindly don't share this QR code.
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  </Box>
  )
}

export default ExtraOrders