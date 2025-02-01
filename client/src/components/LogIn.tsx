import { Dispatch, SetStateAction, useState } from 'react'
import '../styles/LogIn.css'
import { Grid2, Paper} from '@mui/material'
import logo from '../assets/logo-light.png'
import scribble from '../assets/HEAL.svg'

interface LogInProps {
    setPage: Dispatch<SetStateAction<string>>
    setLoggedIn: Dispatch<SetStateAction<boolean>>
}

function LogIn(props: LogInProps) {
    return (
        <Grid2>
       <div style={{ fontSize: '60px', paddingInline: '10vw' , justifyContent: 'flex-start', alignItems: 'center', display: 'flex', flexDirection: 'column', color: 'white', fontFamily:  'agrandir-reg' }}>
        <img src={scribble} alt='scribble' className='scribble'/>
        <Paper elevation={4} style={{padding: '2vh', borderRadius:'20px', backgroundColor: '#F9F4F0', height: 'fit-content', width: '40vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div className='brandText'>Log In</div>
    
        <Grid2 container spacing={2} style={{display: 'flex', flexDirection:'column', justifyContent:'flex-start', alignItems: 'flex-start',  fontSize: '20px'}}>
       
       <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
       <div>Email:</div>
        <input type="text" placeholder="Email" style={{width: '15vw', height: '5vh', backgroundColor: 'white', color: 'black'
        }}/>
        </Grid2>

        <Grid2 container spacing={1} style={{alignItems: 'flex-start', display: 'flex', flexDirection:'column'}}>
          <div>Password:</div> 
        <input type="password" placeholder="Password" style={{width: '15vw',height: '5vh', backgroundColor: 'white', color: 'black'}}/>
        </Grid2>

        </Grid2>
        <button className='filledButton'  onClick={()=>{props.setLoggedIn(true); props.setPage('dashboard')}}> Submit </button>
        <div style={{fontSize: '20px' }}>Don't have an account? <span style={{color: '#6c9482', cursor: 'pointer'}} onClick={()=> props.setPage('signUp')}>Sign Up</span></div>
        </Paper>
      </div>
        </Grid2>
    )
}

export default LogIn