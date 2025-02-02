import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/Dashboard.css'
import {Box, Button, Grid, Grid2, grid2Classes, Modal, Paper, TableRow, TextField} from '@mui/material'
import Prescription from './Prescription'
import scribble from '../assets/HEAL.svg'
import ibuprofen from '../assets/ibuprofen.jpg'
import PrescriptionList from './PrescriptionList'
import { PrescriptionProps } from './Prescription'
import axios from 'axios'
import plus from '../assets/plus.svg'
import InteractionList from './InteractionList'
import {interaction} from './InteractionList'
import loader from '../assets/loading.gif'


interface DashboardProps {
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    setPage: Dispatch<SetStateAction<string>>;
    jwt: string;
    setjwt: Dispatch<SetStateAction<string>>;
    setFirstName: Dispatch<SetStateAction<string>>;
    setPrescriptions: Dispatch<SetStateAction<PrescriptionProps[]>>;
    firstName: string;
    prescriptions: PrescriptionProps[];
    clearUser: () => void;

    unsavedPrescriptions: PrescriptionProps[];
    setUnsavedPrescriptions: Dispatch<SetStateAction<PrescriptionProps[]>>;
}



function Dashboard(props: DashboardProps) {
  const [addDrug, setAddDrug] = useState<boolean>(false)
  const [deleteDrug, setDeleteDrug] = useState<string>('')
  const [newPrescription, setNewPrescription] = useState<PrescriptionProps>({ name: '', dosage: '', deleteDrug: () => {} });
  const [open, setOpen] = useState<boolean>(false)
  const [interactions, setInteractions] = useState<interaction[]>([])
  const [switcher, setSwitcher] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  

  const handleClose = () => setOpen(false);

    const getUser = async () => {
      try{
        const response = await axios.get('http://localhost:3000/api/dashboard/', {
          headers: { 'x-auth-token': props.jwt }
        });
        console.log(response.data)
        props.setFirstName(response.data.firstName)
        props.setPrescriptions(response.data.prescriptions)
        setSwitcher(!switcher)

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

  const getInteractions = async ()=> {
    try{
      const response = await axios.get('http://localhost:3000/api/dashboard/', {
        headers: { 'x-auth-token': props.jwt }
      });
      console.log(response.data)
      setInteractions(response.data.interactions)
      setSwitcher(!switcher)
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



  useEffect(() => {
    if (props.loggedIn) {
      getUser()
    } else {
      props.clearUser()
      props.setjwt('')
    }
  }, [props.loggedIn])

  useEffect(() => {

    getUser()

  }, [deleteDrug])

  useEffect(() => {
    getInteractions()

  }, [switcher])


  const deleteDrugCall = async (name: string) => {
    if (!props.loggedIn) {
      props.setUnsavedPrescriptions(props.unsavedPrescriptions.filter(prescription => prescription.name !== name))
      return
    }

    try {
      const response = await axios.delete('http://localhost:3000/api/dashboard/me', {
        data: { name }, // Pass the data in the "data" field, not as a separate argument
        headers: { 'x-auth-token': props.jwt } // Include the token in the headers
    });
      console.log(response.data)
      getUser()
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error deleting drug:', error.response.data);
        } else {
          console.log('Network error or CORS issue:', error.message);
        }
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPrescription({ ...newPrescription, [name]: value });

  };

  const handleSubmit = async () => {
        
        props.setUnsavedPrescriptions([...props.unsavedPrescriptions, newPrescription])
        console.log(props.unsavedPrescriptions)
        handleClose()
        
     if (props.loggedIn){
        setLoading(true)
        try{
          const response = await axios.post(
            'http://localhost:3000/api/dashboard/me',
            { name: newPrescription.name, dosage: newPrescription.dosage }, // Fixing the data object
            {
              headers: { 'x-auth-token': props.jwt }, // Placing headers correctly
            }
          );
          console.log(response.data)
          props.setFirstName(response.data.firstName)
          props.setPrescriptions(response.data.prescriptions)
          setInteractions(response.data.interactions)
          setLoading(false)

      }  catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log('Error adding drug:', error.response.data);
          } else {
            console.log('Network error or CORS issue:', error.message);
  
      }
    }
  }}
  setNewPrescription({ name: '', dosage: '' , deleteDrug: () => {}});
    

    
  }



        
    return (
      <>
        <Grid2 container spacing={3} direction= {'column'} className='mainGrid' >
                  <Grid2 container direction={'row'}spacing={0} className='welcomeContainer'>
                    {props.loggedIn ? <div className='welcome'>Hi, {props.firstName}!</div> : <></>}
                    {props.loggedIn ? <button style={{marginRight: '5vw', alignSelf: 'center'}} className='filledButton' onClick={()=> {props.setLoggedIn(false);props.setPage('home'); props.clearUser(); props.setjwt('')}}> Log Out</button> 
                    : <button className='filledButton' onClick={()=> props.setPage('signUp')}> Register</button>}
                    </Grid2>
                <Grid2 container spacing={5} direction={'row'} className='subGrid'>
                <Paper elevation={3} className='lBox' style={{ borderRadius: '20px', backgroundColor: '#F9F4F0' }}>
                        <Grid2 container spacing={0} direction={'column'} className='gridContainer'>
                          <Grid2 container direction={'row'} spacing={0} className='titleContainer'>
                        <div className='titles'>My Prescriptions</div>
                        <img src={plus} alt='plus' className='plus' style={{cursor: 'pointer'
                        }} onClick={()=> setOpen(true)} />
                        </Grid2>
                        {props.loggedIn ? <PrescriptionList prescriptions={props.prescriptions} deleteDrug={deleteDrugCall}/> : <PrescriptionList prescriptions={props.unsavedPrescriptions} deleteDrug={deleteDrugCall}/>}
                        
                        </Grid2>
                        </Paper>
                        <Paper elevation={3} className='rBox' style={{ borderRadius: '20px' ,backgroundColor: '#F9F4F0'}}>
                        <Grid2 container spacing={0} direction={'column'} className='gridContainer'>
                        <Grid2 container direction={'row'} spacing={0} className='titleContainer'>
                          <div className='titles'>Drug Interactions</div>
                          {loading ?
                          <Grid2 container direction={'row'} spacing={2}>
                            <div className='subtitles'>calculating new interactions</div>
                          <img src={loader}  className='plus' style={{cursor: 'pointer'}} />
                          </Grid2>: !props.loggedIn ? <div className='subtitles'>Register to see interactions</div> :<></>}
                          </Grid2>
                          <Grid2 container spacing={0} direction={'column'} className='interactionListContainer'>
                            <InteractionList interactions={interactions}/>
                          </Grid2>
                          </Grid2>

                        </Paper>
                        
                    
                </Grid2>
                
                <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle }}>
          <h2 className='titles'>Add New Prescription</h2>
          <TextField label="Drug Name" name="name" value={newPrescription.name} onChange={handleChange} fullWidth />
          <TextField label="Dosage" name="dosage" value={newPrescription.dosage} onChange={handleChange} fullWidth />
          <Button onClick={handleSubmit}>Add</Button>
        </Box>
      </Modal>
          
        </Grid2>
        <div></div>
        </>
    )
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
}

export default Dashboard


