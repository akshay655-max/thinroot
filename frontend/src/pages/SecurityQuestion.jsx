
import React, { useEffect, useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,Input,Box,Flex,Button,Badge,Text,Select,Heading,VStack,StackDivider
  } from '@chakra-ui/react'
  import axios from "axios";
  import { useToast } from '@chakra-ui/react'
  import {useNavigate} from "react-router-dom"

const SecurityQuestion = () => {
    const[question,setQuestion]=useState("")
    const[answer,setAnswer]=useState("")
    const[isError,setisError]=useState({});
    const userID=JSON.parse(localStorage.getItem("userId"))
    const toast = useToast()
    const navigate=useNavigate()
  





    const handleClick=()=>{
      if(!question && !answer){
        setisError({
          question:"The question is required",
          answer:"The Answer is required",
        })

      }else if(!question && answer){
        setisError({...isError,question:"The question is required",answer:""})
      }else if(question && !answer){
        setisError({...isError,answer:"The answer is required",question:""})
      }else{
        setisError({})
        axios.post(`https://magnificent-hen-flannel-nightgown.cyclic.app/users/${userID}`, {
          security_question:{
            question,
            answer,
          }
        })
          .then( (res)=> {
       
            console.log(res.data);
            toast({
              title: res.data.message,
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            localStorage.setItem("userId_token",JSON.stringify(res.data.token))
            if(res.data.token){
              navigate("/reset_password")
            }
  
  
           })
          .catch( (err)=> {
            console.log(err);
          }); 
          
      }
       
   
    }
  return (
    <div>


<Heading textAlign="center" size='2xl' mt="20px" mb="20px">Security Question</Heading> 

<VStack
  divider={<StackDivider borderColor='gray.200' />}
  spacing={4}
  align='stretch'
  w="40%"
  m="auto"
 
>
  <Box h='40px'>
  <Select  onChange={(e)=>setQuestion(e.target.value)} value={question} placeholder='Select option' variant='filled'>
        <option value="what is your age?">what is your age?</option>
        <option value="where do you live?">where do you live?</option>
        <option value="your secrent number">your secrent number</option>
      </Select>
  </Box>
 {isError.question?<Text color="red">{isError.question}</Text>:null} 
  <Box h='40px' >
  <Input type="text" placeholder="write your answer" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
  </Box>
 {isError.answer?<Text color="red">{isError.answer}</Text>:null} 
  <Box h='40px' >
  <Button colorScheme='blue' onClick={handleClick} mt="80px" display="block" m="auto">Submit</Button>
  </Box>
</VStack>
     
    </div>
  )
}

export default SecurityQuestion