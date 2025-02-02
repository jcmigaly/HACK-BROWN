import { Dispatch, SetStateAction, useState } from 'react'
import '../styles/LogIn.css'
import { Grid2, Paper} from '@mui/material'
import logo from '../assets/logo-light.png'
import scribble from '../assets/HEAL.svg'
import axios from 'axios'

interface LogInProps {
    setPage: Dispatch<SetStateAction<string>>
    setLoggedIn: Dispatch<SetStateAction<boolean>>
    setjwt: Dispatch<SetStateAction<string>>
}

function LogIn(props: LogInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password },{ 
        withCredentials: true // Required to send cookies/tokens
      });
      console.log(response.data);
      // Handle successful login (e.g., set logged in state, redirect, etc.)
      props.setLoggedIn(true);
      props.setPage('dashboard');
 
      console.log("Full response:", response);

      const token = response.data.token;  
      console.log("Extracted Token:", token);
    
      if (token) {
        props.setjwt(token);
      } else {
        console.error("No token received in response headers.")
      }
    }catch (error: unknown) {  // Explicitly declare error as 'unknown'
        if (axios.isAxiosError(error)) {
          // Now TypeScript knows error is an AxiosError
          if (error.response) {
            console.log('Error logging in:', error.response.data);
      
            if (error.response.status === 401) {
              setErr('Invalid email or password');
            } else {
              setErr('Please enter a valid email and password of at least 5 characters');
            }
          } else {
            console.log('Network error or CORS issue:', error.message);
            setErr('Network error, please try again.');
          }
        } else {
          console.error('Unexpected error:', error);
          setErr('An unexpected error occurred.');
        }
    }
  }




    return (
        <Grid2>
       <div style={{ fontSize: '60px', paddingInline: '10vw' , justifyContent: 'flex-start', alignItems: 'center', display: 'flex', flexDirection: 'column', color: 'white', fontFamily:  'agrandir-reg' }}>
        <img src={scribble} alt='scribble' className='scribble'/>
        <Paper elevation={4} style={{padding: '2vh', borderRadius:'20px', backgroundColor: '#F9F4F0', height: 'fit-content', width: '40vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div className='brandText'>Log In</div>
    
        <Grid2 container spacing={2} style={{display: 'flex', flexDirection:'column', justifyContent:'flex-start', alignItems: 'flex-start',  fontSize: '20px'}}>
       
       <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
       <div>Email:</div>
        <input type="text" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} style={{width: '15vw', height: '5vh', backgroundColor: 'white', color: 'black'
        }}/>
        </Grid2>

        <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
          <div>Password:</div> 
        <input type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} style={{width: '15vw',height: '5vh', backgroundColor: 'white', color: 'black'}}/>
        </Grid2>

        </Grid2>
        <button className='filledButton'  onClick={handleLogin}> Submit </button>
         <div style={{color: 'red', fontSize: '18px'}} >{err}</div>
        </Paper>
      </div>
        </Grid2>
    )
}

export default LogIn