import React, { useEffect, useState } from 'react'

import { Auth, App } from '../../ServerDetails/firebaseConfig'

import { onAuthStateChanged } from 'firebase/auth'

import SpinnerLoader from '../../Extras/SpinnerLoader/SpinnerLoader'

import AdminId from '../../ServerDetails/adminId'

import Sidebar from '../../Extras/Sidebar/Sidebar'

import {
    ChakraProvider,
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
    Text
  } from '@chakra-ui/react';

  import {
    getDatabase,
    ref,
    onValue,
    set,
  } from 'firebase/database';

const Menu = () => {

    const database = getDatabase(App)

    const menuRef = ref(database, "menu")



    const[isPageLoading, setIsPageLoading]=useState(true)


    const[menuItems, setMenuItems]=useState([])
    const [editableRow, setEditableRow] = useState(null);



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
    }, [Auth])


    useEffect(()=>{
        onValue(menuRef, (snapshot)=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                const menuData = Object.values(data)

                setMenuItems(menuData)
            }
        })
        
    },[])

    const handleEditClick = (index) => {
        setEditableRow(index);
      };
      
      const handleSaveClick = (item) => {
        const { id,item_image, item_name, item_price,item_cut_price,item_stock,item_default_stock ,item_avl} = item;
        const updatedData = {
          item_image,
          item_name,
          item_price: parseFloat(item_price), // Convert to float
          item_cut_price: parseFloat(item_cut_price), // Convert to float
          item_stock: parseInt(item_stock, 10), // Convert to integer
          item_default_stock: parseInt(item_default_stock, 10), // Convert to integer
          item_avl: item_avl === 'true' ? true : false // Convert to boolean
        };
    
        // Update the data in Firebase
        const itemRef = ref(database, `menu/${item_name}`);
        set(itemRef, updatedData)
          .then(() => {
            setEditableRow(null);
          })
          .catch((error) => {
            console.error('Error updating data: ', error);
          });
      };

      const handleAddNewMenu = () => {
        // Create a new menu item with default values
        const newItem = {
            item_image:"",
            item_name:"",
            item_price:0,
            item_cut_price:0,
            item_stock:0,
            item_default_stock:0,
            item_avl:0
        };
      
        // Update the state by appending the new item to the current list of menu items
        setMenuItems((prevMenuItems) => [...prevMenuItems, newItem]);
      };

  return (
    <>
        {
            isPageLoading
            ?
            <SpinnerLoader />
            :
            <>
                <Sidebar children={
                    <Box p={4}>
                    <Flex justify="space-between" mb={4}>
                      <Button onClick={handleAddNewMenu} colorScheme="blue">
                        + Add New Menu Item
                      </Button>
                    </Flex>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Image url</Th>
                          <Th>Name</Th>
                          <Th>Price</Th>
                          <Th>Cut Price</Th>
                          <Th>Current Stock</Th>
                          <Th>Default Stock</Th>
                          <Th>Availability</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {menuItems.map((item, index) => (
                          <Tr key={item.id}>
                            <Td>
                              {editableRow === index ? (
                                <Input
                                  value={item.item_image}
                                  onChange={(e) => {
                                    const updatedItems = [...menuItems];
                                    updatedItems[index].item_image = e.target.value;
                                    setMenuItems(updatedItems);
                                  }}
                                />
                              ) : (
                                <Image boxSize={'40px'} src={item.item_image} />
                              )}
                            </Td>
                            
                            <Td>
                              {editableRow === index ? (
                                <Input
                                  value={item.item_name}
                                  onChange={(e) => {
                                    const updatedItems = [...menuItems];
                                    updatedItems[index].item_name = e.target.value;
                                    setMenuItems(updatedItems);
                                  }}
                                />
                              ) : (
                                item.item_name
                              )}
                            </Td>
                            <Td>
                              {editableRow === index ? (
                                <Input
                                  value={item.item_price}
                                  onChange={(e) => {
                                    const updatedItems = [...menuItems];
                                    updatedItems[index].item_price = e.target.value;
                                    setMenuItems(updatedItems);
                                  }}
                                />
                              ) : (
                                item.item_price
                              )}
                            </Td>
                            <Td>
                              {editableRow === index ? (
                                <Input
                                  value={item.item_cut_price}
                                  onChange={(e) => {
                                    const updatedItems = [...menuItems];
                                    updatedItems[index].item_cut_price = e.target.value;
                                    setMenuItems(updatedItems);
                                  }}
                                />
                              ) : (
                                item.item_cut_price
                              )}
                            </Td>
                            <Td>
                              {editableRow === index ? (
                                <Input
                                  value={item.item_stock}
                                  onChange={(e) => {
                                    const updatedItems = [...menuItems];
                                    updatedItems[index].item_stock = e.target.value;
                                    setMenuItems(updatedItems);
                                  }}
                                />
                              ) : (
                                item.item_stock
                              )}
                            </Td>
                            <Td>
                              {editableRow === index ? (
                                <Input
                                  value={item.item_default_stock}
                                  onChange={(e) => {
                                    const updatedItems = [...menuItems];
                                    updatedItems[index].item_default_stock = e.target.value;
                                    setMenuItems(updatedItems);
                                  }}
                                />
                              ) : (
                                item.item_default_stock
                              )}
                            </Td>
                            <Td>
                              {editableRow === index ? (
                                <Input
                                  value={item.item_avl}
                                  onChange={(e) => {
                                    const updatedItems = [...menuItems];
                                    updatedItems[index].item_avl = e.target.value;
                                    setMenuItems(updatedItems);
                                  }}
                                />
                              ) : (
                                
                                <Text>{item.item_avl}</Text>
                                
                              )}
                            </Td>

                            <Td>
                              {editableRow === index ? (
                                <Button
                                  size="sm"
                                  colorScheme="teal"
                                  onClick={() => handleSaveClick(item)}
                                >
                                  Save
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  colorScheme="blue"
                                  onClick={() => handleEditClick(index)}
                                >
                                  Edit
                                </Button>
                              )}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                }/>
            </>
        }
    </>
  )
}

export default Menu