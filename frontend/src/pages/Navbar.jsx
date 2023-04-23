import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button

} from '@chakra-ui/react'
import {ChevronDownIcon} from "@chakra-ui/icons"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import "../App.css"

const Navbar = () => {
  let usertoken=JSON.parse(localStorage.getItem("token"));
  let userinfo=JSON.parse(localStorage.getItem("user-info"));
  const[token,setToken]=useState(usertoken)
  const navigate=useNavigate()

  const logout=()=>{
    localStorage.clear();
    navigate("/login")

  }
 

  return (
    <div className="navbar-container">
      <div>
      <Link to="/">HomePage</Link>
        {!localStorage.getItem("user-info") && <>  
        <Link to="/register">Register</Link>
        <Link to="/login">login</Link></>}
      
      </div>
      <div>

        {localStorage.getItem("user-info")?      <Menu>
  <MenuButton as={Button} colorScheme='green'>
    {userinfo}
  </MenuButton>
  <MenuList>
    <MenuGroup>
      <MenuItem onClick={logout} color="black">Logout</MenuItem>
      
    </MenuGroup>
    
  </MenuList>
</Menu>:null}

      </div>
   
    </div>
  )
}

export default Navbar