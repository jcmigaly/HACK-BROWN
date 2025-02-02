import { Dispatch, SetStateAction, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/Dashboard.css'
import {Grid, Grid2, grid2Classes, Paper, TableRow} from '@mui/material'
import Prescription from './Prescription'
import scribble from '../assets/HEAL.svg'
import ibuprofen from '../assets/ibuprofen.jpg'
import PrescriptionList from './PrescriptionList'
import { PrescriptionProps } from './Prescription'
import axios from 'axios'

interface DashboardProps {
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    setPage: Dispatch<SetStateAction<string>>;
    jwt: string;
    setjwt: Dispatch<SetStateAction<string>>;
}

function Dashboard(props: DashboardProps) {
  const [prescriptions, setPrescriptions] = useState<PrescriptionProps[]>([])
  const [firstName, setFirstName] = useState<string>('')
  const list = [{drugName: 'Ibuprofen', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'}, 
    {drugName: 'Tylonel', image: ibuprofen,dosage: 'tale 18 times'},
    {drugName: 'Advil', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'},
    {drugName: 'Aleve', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'},
    {drugName: 'Motrin', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'},
    {drugName: 'Aspirin', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'},
    {drugName: 'Tylenol', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'},
    {drugName: 'Advil', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'},{drugName: 'Tylonel', image: ibuprofen,dosage: 'tale 18 times'},
    {drugName: 'Advil', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'},
    {drugName: 'Aleve', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'},
    {drugName: 'Motrin', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'},
    {drugName: 'Aspirin', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'},
    {drugName: 'Tylenol', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'},
    {drugName: 'Advil', image: ibuprofen, dosage: 'Take 1 tablet every 4-6 hours'}]

    const getUser = async () => {
      try{
        const response = await axios.get('http://localhost:3000/api/dashboard/', {
          headers: { 'x-auth-token': props.jwt }
        });
        console.log(response.data)
        setFirstName(response.data.firstName)
        setPrescriptions(response.data.prescriptions)

      } catch (error: unknown)
      {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log('Error getting user:', error.response.data);
          } else {
            console.log('Network error or CORS issue:', error.message);
          }
      }
    }
  }

  const clearUser = () => {
    setFirstName('')
    setPrescriptions([])
    props.setjwt('')
  }

      if (props.loggedIn) {
        getUser()
      }    
    return (
        <Grid2 container spacing={3} direction= {'column'} className='mainGrid' >
                  <Grid2 container direction={'row'}spacing={128.5} className='welcomeContainer'>
                    {props.loggedIn ? <div className='welcome'>Hi, {firstName}!</div> : <></>}
                    {props.loggedIn ? <button className='filledButton' onClick={()=> props.setLoggedIn(false)}> Log Out</button> 
                    : <button className='filledButton' onClick={()=> props.setPage('signUp')}> Register</button>}
                    </Grid2>
                <Grid2 container spacing={3} direction={'row'} className='subGrid'>
                <Paper elevation={3} className='lBox' style={{ borderRadius: '20px', backgroundColor: '#F9F4F0' }}>
                        <Grid2 container spacing={0} direction={'column'} className='gridContainer'>
                        <div className='titles'>My Prescriptions</div>
                        
                        <PrescriptionList prescriptions={prescriptions}/>
                        
                        </Grid2>
                        </Paper>
                        <Paper elevation={3} className='rBox' style={{ borderRadius: '20px' ,backgroundColor: '#F9F4F0'}}>
                        <Grid2 container spacing={0} direction={'column'} className='gridContainer'>
                          <div className='titles'>Daily Dosage</div>
                          </Grid2>

                        </Paper>
                        
                    
                </Grid2>
                <Grid2 container spacing={3} direction={'column'} className='gridContainer' style={{padding: 0}}>
                    
                    <Paper elevation={3} className='bottomBox' style={{ borderRadius: '20px' , backgroundColor: '#F9F4F0'}}>
                    <Grid2 container spacing={0} direction={'column'} className='gridContainer'>
                      <div className='titles'>Interactions</div>
                      </Grid2>
                      </Paper>
                </Grid2>
          
        </Grid2>
    )
}

export default Dashboard


