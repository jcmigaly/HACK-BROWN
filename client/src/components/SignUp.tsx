import { Dispatch, SetStateAction, useState } from 'react'
import '../styles/LogIn.css'
import {Grid2, Paper} from '@mui/material'
import scribble from '../assets/HEAL.svg'
import axios from 'axios'

interface LogInProps {
    setPage: Dispatch<SetStateAction<string>>
    setLoggedIn: Dispatch<SetStateAction<boolean>>
}

function SignUp(props: LogInProps) {
  const [err, setErr] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


 const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/', { firstName, lastName, email, password },{ 
        withCredentials: true // Required to send cookies/tokens
      });
      props.setLoggedIn(true);
      props.setPage('dashboard');
    } catch (error: unknown) {  // Explicitly declare error as 'unknown'
        if (axios.isAxiosError(error)) {
          
        } else {
          console.error('Unexpected error:', error);
          setErr('An unexpected error occurred.');

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
        <input type="text" placeholder="Name" style={{width: '15vw',height: '5vh', backgroundColor: 'white', color: 'black'}}/>
       </Grid2>
       <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
         <div>Last Name:</div> 
        <input type="text" placeholder="Name" style={{width: '15vw',height: '5vh', backgroundColor: 'white', color: 'black'}}/>
       </Grid2>
      <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
      <div>Email:</div>
       <input type="text" placeholder="Username" style={{width: '15vw', height: '5vh', backgroundColor: 'white', color: 'black'
       }}/>
       </Grid2>

       <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
         <div>Password:</div> 
       <input type="password" placeholder="Password" onChange={(e)=>e.target.value} style={{width: '15vw',height: '5vh', backgroundColor: 'white', color: 'black'}}/>
       </Grid2>
       <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
         <div>Confirm Password:</div> 
       <input type="password" placeholder="Password" onChange={(e)=>e.target.value} style={{width: '15vw',height: '5vh', backgroundColor: 'white', color: 'black'}}/>
       </Grid2>
       

       </Grid2>
       <button className='filledButton' style={{width: '10vw', height: '6vh', margin: '3vh'}} onClick={()=>{props.setLoggedIn(true); props.setPage('dashboard')}}> Register </button>
       <div style={{color: 'red', fontSize: '18px'}} >{err}</div>
       </Paper>
     </div>
       </Grid2>
    )
}

export default SignUp