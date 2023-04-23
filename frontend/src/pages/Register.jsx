import React, { useEffect, useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,Input,Box,Flex,Button,Badge,Text,Select
  } from '@chakra-ui/react'
  import { useToast } from '@chakra-ui/react'
  import {useNavigate,Link} from "react-router-dom"
  import axios from 'axios';
  import {BeatLoader} from "react-spinners"

const Register = () => {
  const initialValues = { name: "", email: "", password: "",phone:"",question:"",answer:"" };
  const[formValues,setFormValues]=useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false); //flag for submitting the form
      const[token,setToken]=useState("");
    const[loading,setLoading]=useState(false)
    const toast = useToast()
    const navigate=useNavigate()
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name,value)
      setFormValues({ ...formValues, [name]: value });
      setIsSubmit(true);
      console.log(formValues)
    };

    useEffect(()=>{
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        axios.post('https://magnificent-hen-flannel-nightgown.cyclic.app/users/register', {name:formValues.name, email: formValues.email, password:formValues.password,phone:formValues.phone,security_question:{
          question:formValues.question,
          answer:formValues.answer
        }})
        .then( (res)=> {
          console.log(res.data);
          setLoading(false);
          toast({
            title: res.data.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          if(res.data){
            navigate("/login")
          }
    
        })
        .catch( (err)=> {
          console.log(err);
        }); 
      }
    },[formErrors])

    const handleLogin=(e)=>{
      e.preventDefault();
     setFormErrors(validate(formValues));
     setIsSubmit(true);

    }

    const validate=(formValues)=>{
      const errors={};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //for validating email
      if(!formValues.question){
        errors.question="Question is required"
      }
      if(!formValues.answer){
        errors.answer="Answer is required"
      }
      if(!formValues.name){
        errors.name="UserName is required!"
      }
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
      if(!formValues.phone){
        errors.phone="contact is required"
      }else if (formValues.phone.length>10){
        errors.phone="Contact cannot exceed more than 10 digits"
      }else if(formValues.phone.length<10){
        errors.phone="contact cannot less than 10 digits"
      }
      return errors;
    }

  return (
    <>

    <Box w="24%"  m="auto" mt="40px" boxShadow='lg' p="10px"  >
  

    <FormControl isRequired>
    <Flex flexDirection="column" gap={4}  >

    <FormLabel>Name</FormLabel>
      <Input type='text' value={formValues.name} onChange={handleChange} name="name" />
      <Text color="red">{formErrors.name}</Text>


      <FormLabel>Phone</FormLabel>
      <Input type='number' value={formValues.phone} onChange={handleChange} name="phone" />
      <Text color="red">{formErrors.phone}</Text>
 


      <FormLabel>Email</FormLabel>
      <Input type='text' value={formValues.email} onChange={handleChange} name="email" />
      <Text color="red">{formErrors.email}</Text>
     
  
      <FormLabel>Password</FormLabel>
      <Input type='text' value={formValues.password} onChange={handleChange} name="password" />
      <Text color="red">{formErrors.password}</Text>



      <FormLabel>Security Question</FormLabel>
      <Select name="question" onChange={handleChange} value={formValues.question} placeholder='Select option' variant='filled'>
        <option value="what is your age?">what is your age?</option>
        <option value="where do you live?">where do you live?</option>
        <option value="your secrent number">your secrent number</option>
      </Select>
      <Text color="red">{formErrors.question}</Text>
      <Input type="text" placeholder="write your answer" value={formValues.answer} name="answer"  onChange={handleChange}/>
      <Text color="red">{formErrors.answer}</Text>
        <Button 
         colorScheme='blue'
         size='md'
         w="90px"
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
  <Text textAlign="center" >Not account?<Link to="/login" >  <Badge colorScheme='red'>Login</Badge></Link></Text>
        </Flex>
    </FormControl>



    </Box>
    
    </>
  )
}

export default Register;