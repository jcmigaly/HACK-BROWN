import React from 'react';
import { Grid2, Paper } from '@mui/material';
import '../styles/Dashboard.css';
import Interaction from './Interaction';

interface interaction {

  name1: string;
  name2: string;
  description: string;
  level: string;
}
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas orci non leo bibendum, et dignissim ante imperdiet. Fusce blandit accumsan ullamcorper. Aliquam erat volutpat. Morbi posuere et tellus sed varius. Vivamus fringilla dui id facilisis dapibus. Curabitur consequat mollis felis. Aliquam in cursus sapien. Proin iaculis velit augue, sed congue lacus varius at. Praesent posuere ante sagittis elit condimentum feugiat. Aliquam tempus sed nunc eu elementum. Vestibulum venenatis enim quis ipsum blandit, nec fringilla turpis aliquet. Nullam est augue, dignissim non massa eu, sagittis rhoncus lacus. Mauris sit amet neque eros.'

const interactions: interaction[] = [
    {name1: 'Ibuprofen', name2: 'Tylenol', description: lorem, level: 'minor'},
    {name1: 'Insulin', name2: 'Advil', description: lorem, level: 'moderate'},
    {name1: 'Ibuprofen', name2: 'Aspirin', description: lorem, level: 'major'},
    {name1: 'Ibuprofen', name2: 'Aleve', description: lorem, level: 'minor'},
]

const interactionList = () => {
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