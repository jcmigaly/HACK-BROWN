import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/Dashboard.css'
import {Grid, Grid2, Paper} from '@mui/material'

function Dashboard() {
    return (
        <Grid2 className='mainMessage'>
           <div style={{ fontSize: '60px', paddingInline: '10vw'  }}>
        Dashboard Page
      </div>
        </Grid2>
    )
}

export default Dashboard