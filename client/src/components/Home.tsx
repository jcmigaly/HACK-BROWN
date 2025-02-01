import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import '../styles/Home.css'
import {Grid2, Paper} from '@mui/material'
import logo from '../assets/logo-light.png'

interface HomeProps {
  page: string
  setPage: Dispatch<SetStateAction<string>>
}

function Home(props: HomeProps) {
    return (
      
        <Grid2 className='mainMessage'>
          <Grid2 container spacing={1} >
          <img src={logo} className="homepage-logo" />
      
      </Grid2>

      <div className='floating-text' style={{ fontSize: '35px' ,paddingTop: '4vh',paddingInline: '10vw', color: '#6c9482', fontFamily:  'agrandir-reg' }}>
        Optimize your nutrition to maximize performance.
      </div>
        <Grid2 container spacing={1} style={{display
        :'flex', flexDirection: 'column', fontSize: '30px' ,paddingInline: '10vw', color: 'white',
        fontFamily:  'agrandir-reg'
        }}>
        <div>Learn the science behind your nutrition choices. </div>
        <div>Get personalized nutrition plans.</div>
        <div>Track your progress.</div>
        <button className='buttonText2' onClick={()=>props.setPage('signUp')}> Get Started </button>
       
        </Grid2>
        </Grid2>
    )
}

export default Home