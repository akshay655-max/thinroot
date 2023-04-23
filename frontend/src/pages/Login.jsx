import React, { useState,useEffect } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,Input,Box,Flex,Button,Text,Badge,Container
  } from '@chakra-ui/react'
  import { useToast } from '@chakra-ui/react'
  import {useNavigate,Link} from "react-router-dom"
  import axios from 'axios';
  import {BeatLoader} from "react-spinners"

const Login = () => {
  const initialValues = {  email: "", password: "" };
  const[formValues,setFormValues]=useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
   
    const[token,setToken]=useState("");
    const[loading,setLoading]=useState(false)
    const toast = useToast()
    const navigate=useNavigate()

    localStorage.clear();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name,value)
      setFormValues({ ...formValues, [name]: value });
      setIsSubmit(true);
    };
    
    const handleLogin=(e)=>{
      e.preventDefault();
     setFormErrors(validate(formValues));
     setIsSubmit(true);
    }

    const validate=(formValues)=>{
      const errors={};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //for validating email
   
      if(!formValues.email){
        errors.email="Email is required!"
      }else if(!regex.test(formValues.email)){
        errors.email="This is not a valid email format!";
      }
      if (!formValues.password) {
        errors.password = "Password is required";
      } else if (formValues.password.length < 4) {
        errors.password= "Password must be more than 4 characters";
      } else if (formValues.password.length> 10) {
        errors.password= "Password cannot exceed more than 10 characters";
      }
      return errors;
    }


    useEffect(()=>{
  
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log("formvalues",formValues); 
    axios.post('https://magnificent-hen-flannel-nightgown.cyclic.app/users/login', formValues)
    .then( (res)=> {
      setLoading(false);
      console.log(res);
      console.log(res.data);
      setToken(res.data.token)
      localStorage.setItem("user-info",JSON.stringify(res.data.name))
      localStorage.setItem("token",JSON.stringify(res.data.token));
      toast({
        title: res.data.token? `Login successfully ${res.data.name}`:res.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      if(res.data.token){
       return navigate("/")
      }
  
     })
    .catch( (err)=> {
      console.log(err);
    }); 
      }
    },[formErrors])
    
  return (
    <>
     
    <Box w="24%"  m="auto" mt="40px" boxShadow='lg' p="10px"  maxW="120em" overflow="hidden">
  

    <FormControl isRequired>
    <Flex flexDirection="column" gap={4}  >
      <FormLabel>Email</FormLabel>
      <Input type='text' name="email" value={formValues.email} onChange={handleChange} />
      <Text color="red">{formErrors.email}</Text>
   
      <FormLabel>Password</FormLabel>
      <Input type='text' name="password" value={formValues.password} onChange={handleChange} />
      <Text color="red">{formErrors.password}</Text>

  <Link to="/forgot"> <Badge variant='outline' colorScheme='red'>Forgot Password?</Badge></Link>
  
        <Button 
         colorScheme='blue'
        
   
         display="block"
         m="auto" 
         mt="10px" 
         _hover={{ bg: 'blue.300' }}
         _active={{
           bg: '#dddfe2',
           transform: 'scale(0.98)',
          borderColor: '#bec3c9',
        }}
        _focus={{
           boxShadow:
           '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
         }}
         onClick={handleLogin}
         >
    Submit {loading&&<BeatLoader size={8} color='white' /> }
  </Button>
  <Text textAlign="center" >Not account?<Link to="/register" >  <Badge colorScheme='red'>Signup</Badge></Link></Text>
        </Flex>
    </FormControl>
    </Box>
    </>
  )
}

export default Login