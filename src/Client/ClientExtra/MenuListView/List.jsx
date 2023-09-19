import React from 'react'

import {
    Text,
    Avatar,
    Button
} from "@chakra-ui/react"


const List = (props) => {
  return (
    <Button >
        <Avatar src={props.link} />
        <Text >{props.text}</Text>
    </Button>    
  )
}

export default List