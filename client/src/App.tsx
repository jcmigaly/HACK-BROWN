import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Grid2, Paper } from '@mui/material'
import './App.css'
import scribble from './assets/HEAL.svg'
import GetStarted from './components/GetStarted'
import Dashboard from './components/Dashboard'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'


function App() {
  const [page, setPage] = useState<string>('home')
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [jwt, setjwt] = useState('');


  return (
    <div className='App'>
      <Grid2 container direction={'row'} spacing={0} className='App-header'>
        <div style={{fontSize: '30px', color: 'black', fontFamily: 'agrandir-reg', margin: '5px', marginLeft: '20px', cursor: 'pointer'
        }} onClick={()=>{setPage('home'); setLoggedIn(false)}}>Scriptly</div>
      </Grid2>
      <Grid2
    container
    justifyContent='center'
    display={'flex'}
    flexDirection={'column'}
    style={{
      width: '100vw',   // Full width of the viewport
      padding: '0',
      backgroundColor: '#EAD2C3',
      minHeight: '100vh',
   overflowY: 'auto'
    }}
  >
        
          {page === 'home' ? 
          <Grid2 container direction={'column'} spacing={0} className='App-body'>
            <Grid2 container direction={'column'} spacing={0}>
           <img src={scribble} alt='scribble' className='scribble'/>
           </Grid2>
           <Grid2 container direction={'column'} spacing={3} className='subtext'>
           <div className='subtitle'>The key to managing and understanding your prescriptions</div>
           <button className='filledButton' onClick={()=> setPage('getStarted')}> Get Started</button> 
           </Grid2 >
            </Grid2>
        
        : page === 'getStarted' ? <GetStarted setPage={setPage}/> 
        : page === 'dashboard' ? <Dashboard setPage={setPage} setLoggedIn={setLoggedIn} loggedIn={loggedIn} jwt={jwt} setjwt={setjwt}/> 
        : page === 'logIn' ? <LogIn setPage={setPage} setLoggedIn={setLoggedIn} setjwt={setjwt}/> 
        : page === 'signUp' ? <SignUp setPage={setPage} setLoggedIn={setLoggedIn}/>
        :null
        }
        
      </Grid2>
      </div>
  )
}

export default App
