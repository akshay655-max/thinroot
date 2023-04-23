import React, { useEffect, useState } from 'react'
import { useToast ,Text,Input,Button,Box,Heading} from '@chakra-ui/react'
import {useNavigate,Link} from "react-router-dom"

const ResetPassword = () => {
    const[newPassword,setPassword]=useState("")
    const[isError,setisError]=useState("")
    const[isSubmit,setisSubmit]=useState(false);
    const toast = useToast()
    const userId_token=JSON.parse(localStorage.getItem("userId_token"));
    const userId=JSON.parse(localStorage.getItem("userId"));
    const navigate=useNavigate()
    let url=`https://magnificent-hen-flannel-nightgown.cyclic.app/users/reset/${userId}`

  

    const handleClick=async()=>{

      if(!newPassword){
         setisError("Password is required")
      }else if(newPassword.length<4){
        setisError("Password must be more than 4 characters")
      }else if(newPassword.length>10){
        setisError("Password cannot exceed more than 10 characters")
      }else {
        setisError("")
        const payload={
          newPassword
        }
     
       await fetch(url, {
       method:"PUT",
        headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${userId_token}`
     },
     body: JSON.stringify(payload)
     }).then((res)=>{
     return res.json();
     }).then((res)=>{
     console.log(res)
     toast({
       title: res.message,
       status: 'success',
       duration: 5000,
       isClosable: true,
     })
     if(res.message==="Password updated successfully"){
       navigate("/login")
     }
    
     }).catch((err)=>{
     console.log(err)
     })

      }
      
      
   
     
   
    }
    
  
  return (
    <div>
    <Heading textAlign="center" size='2xl' mt="20px">Reset Password</Heading>
      <Box w="60%" m="auto" mt="50px"  display="flex" justifyContent="center">

      <Input
        w="60%"
         isInvalid
         errorBorderColor='red.300'
         placeholder='Enter New Password'
         value={newPassword}
         onChange={(e)=>setPassword(e.target.value)}
  />
    
    <Button colorScheme='blue' onClick={handleClick} ml="10px">Submit</Button>
       


      </Box>
      <Box color="red" m="auto" w="40%" mt="10px">{isError} </Box>
 
    </div>
  )
}

export default ResetPassword