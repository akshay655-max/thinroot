import React, { useState } from 'react'
import axios from "axios"

import {useNavigate,Link} from "react-router-dom"
import { useToast ,Text,Input,Button,Box,Heading} from '@chakra-ui/react'


const ForgotPassword = () => {
    const[email,setEmail]=useState("")
    const toast = useToast()
    const navigate=useNavigate()
    const[isError,setisError]=useState("")
   
    const handleSubmit=()=>{
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //for validating email
      if(!email){
        setisError("Email is required!")
      }else if(!regex.test(email)){
        setisError("This is not a valid email format!");
      }else{
        setisError("")
        const payload={
          email
        }
      
        if(email){
          axios.post('https://magnificent-hen-flannel-nightgown.cyclic.app/users/', payload)
          .then( (res)=> {
           console.log(res.data.userId)
           localStorage.setItem("userId",JSON.stringify(res.data.userId));
           toast({
            title: !res.data.userId? "User not found,try correct one": "User account verified",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          if(res.data.userId){
            navigate("/security_question")
          }
   
  
  
           })
          .catch( (err)=> {
            console.log(err);
          }); 
            
        }
        
      }
    
    


    }
  
  return (
    <div>
        <Heading textAlign="center" size='2xl' mt="20px">Forgot Password</Heading>
      <Box w="60%" m="auto" mt="50px"  display="flex" justifyContent="center">

      <Input
        w="60%"
         isInvalid
         errorBorderColor='red.300'
         placeholder='Enter email'
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
  />
    
    <Button colorScheme='blue' onClick={handleSubmit} ml="10px">Submit</Button>
       


      </Box>
      <Box color="red" m="auto" w="40%" mt="10px">{isError} </Box>
       
    </div>
  )
}

export default ForgotPassword