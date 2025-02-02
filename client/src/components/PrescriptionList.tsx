import React from 'react';
import { Grid2, Paper } from '@mui/material';
import Prescription from './Prescription';
import '../styles/Dashboard.css';

interface Prescription {

  name: string;
  dosage: string;
}

interface PrescriptionListProps {
  prescriptions: Prescription[];
  deleteDrug: (name: string) => void;
}

const PrescriptionList = ({ prescriptions, deleteDrug }: { prescriptions: Prescription[], deleteDrug: (name: string) => void }) => {
  return (
    <div className='prescriptionList'>
    <Grid2 container spacing={3} direction={'column'}  padding={'10px'}>
      {prescriptions.map((prescription: Prescription) => (

          <Prescription

            name={prescription.name}
            dosage={prescription.dosage}
            deleteDrug={deleteDrug}
          />
      ))}
    </Grid2>
    </div>
  );
};

export default PrescriptionList;