import { Grid2 } from "@mui/material";
import '../styles/Dashboard.css'
import trash from '../assets/trash.svg'




export interface PrescriptionProps{
    name: string;
    dosage: string;
}

function Prescription(props: PrescriptionProps) {
    return (
    
        <div className='prescriptionContainer'>
            <Grid2 container direction='row' spacing= {0} style={{display: 'flex', flexDirection: 'row' ,alignItems: 'center', justifyContent: 'space-between', width: '100%', whiteSpace: 'nowrap'}}>
            <Grid2 container direction='row' style={{ display: 'flex', flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start' ,width: 'auto'}}>
        
       
           
        
            <div style={{fontSize: '20px', paddingInline: '1vw', fontFamily:'agrandir-bold'}}>{props.name}</div>
            
            <div style={{fontSize: '18px', paddingInline: '1vw'}}>Usage Instructions: {props.dosage}</div>
            </Grid2>
            <img src={trash} alt='trash' style={{height: '30px', width: '30px', cursor: 'pointer',marginLeft: '10px'}}/>
            </Grid2>
            </div>

    )

}

export default Prescription