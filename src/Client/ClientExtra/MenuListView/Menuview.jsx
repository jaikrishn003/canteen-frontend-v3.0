import React from 'react'



import Menulistview from './Menulistview'
import List from './List';

import "./Categories.css"

import {Button, Text} from '@chakra-ui/react'

const Menuview = () => {
    const [menuData, setmenuData]=useState([])

  return (
    <>
        {menuData.map((item)=>(
            <Menulistview itemUrl={item.pic}  itemId={item.id} itemName={item.name} itemClass = {item.class} itemCutprice={item.price}  offerPrice={item.offer}/>
      ))}
    </>
  )
}

export default Menuview