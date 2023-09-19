import React from 'react'

import { Avatar, AvatarBadge, AvatarGroup,
  Menu,
  MenuButton,
  MenuList, 
  MenuItem
} from '@chakra-ui/react'

import "./TopbarClient.css"

import { Auth } from '../../../ServerDetails/firebaseConfig'

import { signOut } from 'firebase/auth'

const TopbarClient = (props) => {

  





  return (
    <div className='top-bar-spacing'>
      <div>
        <h1 className='top-text'>{props.content} <strong>{props.bld}</strong></h1>
      </div>
      
      <div style={{marginRight:"10px",WebkitTapHighlightColor:"transparent"}} className='top-bar-avatar'>
        <Menu>
          <MenuButton  name={props.bld} src={props.displayPic} cursor='pointer'>
            <Avatar size='md' name='username' src={props.displayPic} />    
          </MenuButton>
          <MenuList maxWidth={'xs'}>
            <MenuItem onClick={()=>{
              signOut(Auth).then(()=>{
                console.log('Logged Out')
                window.location.href="/login"
              }).catch((error)=>{
                console.log('An unknown error has happened')
              })
            }}>Logout</MenuItem>
          </MenuList>
        </Menu>
        {/* <Avatar size='md' name='username' src={props.displayPic} /> */}
      </div>
      
    </div>
    
  )
}

export default TopbarClient