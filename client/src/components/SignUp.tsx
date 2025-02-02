import { Dispatch, SetStateAction, useState } from 'react'
import '../styles/LogIn.css'
import {Grid2, Paper} from '@mui/material'
import scribble from '../assets/HEAL.svg'
import axios from 'axios'
import { PrescriptionProps } from './Prescription'
import  {interaction} from './InteractionList'
import Interaction from './Interaction'

interface LogInProps {
    setPage: Dispatch<SetStateAction<string>>
    setLoggedIn: Dispatch<SetStateAction<boolean>>
    jwt: string
    setjwt: Dispatch<SetStateAction<string>>
    unsavedPrescriptions: PrescriptionProps[];
    setUnsavedPrescriptions: Dispatch<SetStateAction<PrescriptionProps[]>>;
    interactions: interaction[]
    setInteractions: Dispatch<SetStateAction<interaction[]>>;
}

function SignUp(props: LogInProps) {
  const [err, setErr] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');


 const handleSignUp = async () => {
  if (password !== password2) {
    console.log('Passwords do not match');
    setErr('Passwords do not match');
    return;
  } else {
  console.log('Signing up');
  setErr('');
    try {
      const response = await axios.post('http://localhost:3000/api/users/', { firstName: firstName, lastName: lastName, email: email, password: password, prescriptions: props.unsavedPrescriptions },{ 
        withCredentials: true // Required to send cookies/tokens
      });
      props.setjwt(response.data.token);
      props.setLoggedIn(true);
      console.log(props.unsavedPrescriptions)
      props.setUnsavedPrescriptions([]);
      props.setPage('dashboard');
      
    } catch (error: unknown) {  // Explicitly declare error as 'unknown'
        if (axios.isAxiosError(error)) {
          if(error.response){
            console.log('Error logging in:', error.response.data);
            if (error.response.status === 401) {
              setErr('Invalid email or password');
            } else {
              setErr('Please enter a valid email and password of at least 5 characters');
            }
          
        } else {
          console.error('Unexpected error:', error);
          setErr('An unexpected error occurred.');

    }
  }
  }
  try {
    const response = await axios.get('http://localhost:3000/api/dashboard/all', {
      headers: { 'x-auth-token': props.jwt }
    });
    props.setInteractions(response.data.interactions)
    console.log(props.interactions)
    
  }  catch (error: unknown) {  // Explicitly declare error as 'unknown'
    if (axios.isAxiosError(error)) {
      if(error.response){
        console.log('Error logging in:', error.response.data);
        if (error.response.status === 401) {
          setErr('Invalid email or password');
        } else {
          setErr('Please enter a valid email and password of at least 5 characters');
        }
      
    } else {
      console.error('Unexpected error:', error);
      setErr('An unexpected error occurred.');

}
}
}
 }
}




    return (
      <Grid2 className='mainMessage'>
      <div style={{ fontSize: '60px', paddingInline: '10vw' , justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', color: '#6c9482', fontFamily:  'agrandir-reg', marginTop: '10vh' }}>
      <img src={scribble} alt='scribble' className='scribble' style={{marginTop:'90px'}}/>
       <Paper elevation={4} style={{padding: '2vh', margin: '2vh', borderRadius:'20px',backgroundColor: '#F9F4F0', height: 'fit-content', width: '40vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
       <div className='brandText'>Sign Up</div>
   
       <Grid2 container spacing={2} style={{display: 'flex', flexDirection:'column', justifyContent:'flex-start', alignItems: 'flex-start',  fontSize: '20px'}}>
       <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
         <div>First Name:</div> 
        <input type="text" placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} style={{width: '15vw',height: '5vh', backgroundColor: 'white', color: 'black'}}/>
       </Grid2>
       <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
         <div>Last Name:</div> 
        <input type="text" placeholder="Last Name"  onChange={(e)=>setLastName(e.target.value)} style={{width: '15vw',height: '5vh', backgroundColor: 'white', color: 'black'}}/>
       </Grid2>
      <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
      <div>Email:</div>
       <input type="text" placeholder="Username"onChange={(e)=>setEmail(e.target.value)}style={{width: '15vw', height: '5vh', backgroundColor: 'white', color: 'black'
       }}/>
       </Grid2>

       <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
         <div>Password:</div> 
       <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} style={{width: '15vw',height: '5vh', backgroundColor: 'white', color: 'black'}}/>
       </Grid2>
       <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
         <div>Confirm Password:</div> 
       <input type="password" placeholder="Password" onChange={(e)=>setPassword2(e.target.value)} style={{width: '15vw',height: '5vh', backgroundColor: 'white', color: 'black'}}/>
       </Grid2>
       

       </Grid2>
       <button className='filledButton' style={{width: '10vw', height: '6vh', margin: '3vh'}} onClick={handleSignUp}> Register </button>
       <div style={{color: 'red', fontSize: '18px'}} >{err}</div>
       </Paper>
     </div>
       </Grid2>
    )
}

export default SignUp