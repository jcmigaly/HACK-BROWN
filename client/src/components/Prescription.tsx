import { Grid2 } from "@mui/material";
import '../styles/Dashboard.css'



export interface PrescriptionProps{
    drugName: string;
    image: string;
    dosage: string;
}

function Prescription(props: PrescriptionProps) {
    return (
    
        <div className='prescriptionContainer'>
            <Grid2 container direction='row' style={{alignItems: 'center', justifyContent: 'flex-start' ,width: '100%'}}>
            <img src={props.image} alt={props.drugName} style={{ height: '7vh', width: '7vh', objectFit: 'cover', paddingInline: '1vw'
            }}/>
           
        
            <div style={{fontSize: '20px', paddingInline: '1vw', fontFamily:'agrandir-bold'}}>{props.drugName}</div>
            
            <div style={{fontSize: '18px', paddingInline: '1vw'}}>Usage Instructions: {props.dosage}</div>
            </Grid2>
            </div>

    )

}

export default Prescription