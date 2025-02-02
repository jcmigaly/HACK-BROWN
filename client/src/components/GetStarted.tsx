import { Dispatch, SetStateAction, useState } from 'react'
import '../styles/GetStarted.css'
import { Grid2, Paper} from '@mui/material'

interface LogInProps {
    setPage: Dispatch<SetStateAction<string>>
}

function getStarted(props: LogInProps) {
    return (
        <Grid2 style={{  justifyContent: 'center'}}>
       <div style={{  justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontFamily:  'agrandir-reg' }}>
        
        <Grid2 container spacing={2} direction={'column'} alignItems={'center'}>
        <div className='brandText'>Get Started with Scriptly</div>
        <button className='otherButton' onClick={()=>props.setPage('dashboard')}> First Time User</button> 
        <button className='emptyButton' onClick={()=>props.setPage('logIn')}> Returning User</button> 
        </Grid2>
 
      </div>
        </Grid2>
    )
}

export default getStarted