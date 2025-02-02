import React from 'react';
import { Grid2, Paper } from '@mui/material';
import Prescription from './Prescription';
import '../styles/Dashboard.css';

interface Prescription {

  drugName: string;
  image: string;
  dosage: string;
}

interface PrescriptionListProps {
  prescriptions: Prescription[];
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({ prescriptions }) => {
  return (
    <div className='prescriptionList'>
    <Grid2 container spacing={3} direction={'column'}  padding={'10px'}>
      {prescriptions.map((prescription) => (

          <Prescription

            drugName={prescription.drugName}
            image={prescription.image}
            dosage={prescription.dosage}
          />
      ))}
    </Grid2>
    </div>
  );
};

export default PrescriptionList;