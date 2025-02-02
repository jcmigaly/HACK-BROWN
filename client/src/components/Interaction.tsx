import { Grid2 } from "@mui/material";
import '../styles/Dashboard.css'
import { useState } from "react";
import yellowArrows from '../assets/yellowArrows.svg'
import orangeArrows from '../assets/orangeArrows.svg'
import redArrows from '../assets/redArrows.svg'

interface InteractionProps{
    name1: string;
    name2: string;
    description: string;
    level: string;
}


const Interaction = (props: InteractionProps) =>{
    return (
    
        <div className='interactionContainer'>
            <Grid2 container direction='column' spacing= {0} style={{display: 'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'center', width: '100%'}}>
            <Grid2 container direction='row' style={{ display: 'flex', flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between' ,width: 'auto'}}>
          <div style={{fontSize: '30px', paddingInline: '1vw', fontFamily:'agrandir-bold'}}>{props.name1}</div>
          {props.level === "minor" ? 
          <img src={yellowArrows} alt='arrows' className="arrows" />
          : props.level === "moderate" ?
          <img src={orangeArrows} alt='arrows' className="arrows"/>
          : props.level === "major" ?
          <img src={redArrows} alt='arrows' className="arrows"/>:
          <></>}

          <div style={{fontSize: '30px', paddingInline: '1vw', fontFamily:'agrandir-bold'}}>{props.name2}</div>
            </Grid2>
            <div style={{fontSize: '17px', paddingInline: '1vw', textAlign:'justify'}}>{props.description}</div>
            </Grid2>
            </div>

    )

}

export default Interaction