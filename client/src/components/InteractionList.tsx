import React from 'react';
import { Grid2, Paper } from '@mui/material';
import '../styles/Dashboard.css';
import Interaction from './Interaction';
import InteractionProps from './Interaction';

export interface interaction {

  name1: string;
  name2: string;
  description: string;
  level: string;
}

{

}

const interactionList = ({ interactions }: { interactions: interaction[]}) => {
    return (
    <div className='interactionList'>
    <Grid2 container spacing={3} direction={'column'}  padding={'10px'}>
      {interactions.map((interaction: interaction) => (

          <Interaction

            name1={interaction.name1}
            name2={interaction.name2}
            description={interaction.description}
            level={interaction.level}

          />
      ))}
    </Grid2>
    </div>
  );
};

export default interactionList;