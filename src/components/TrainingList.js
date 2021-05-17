import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddTraining from './AddTraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Traininglist(){

  const [msg, setMessage] = useState('');
  const [open, setOpen] = useState(false);
    const [trainings, setTrainings] = useState([]);
    
      
    useEffect(() => {
        fetchTrainings();
    },  []);

    const openSnackBar = () => {
      setOpen(true);
    }
  
    const closeSnackBar = () => {
      setOpen(false);
    }
    const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/api/trainings')
      .then(response => response.json())
      .then(data => setTrainings(data.content))
      .catch(err => console.error(err))
    }
    
  const deleteTraining = (link) => {
  
    if (window.confirm('Are you sure you want to delete this training?')){
        fetch(link[0].href, {
          method: 'DELETE'})
        .then(response => {
        if(response.ok) {
          fetchTrainings();
          setMessage('This training was deleted succesfully');
          setOpen(true);
          openSnackBar();
        } else {
            alert('Something went wrong in deletion');
          }
        })
        .catch(err => console.log(err))
        }
      } 

      const columns = [
        { 
          headerName: '', field: 'date', sortable: true, filter: true,
          cellRenderer: (data) => {
              return Moment(data.value).format('LLL');
          }
        },
        { field: 'duration', sortable: true, filter: true},
        { field: 'activity', sortable: true, filter: true },
        {
         headerName: '',
         field: 'links',
         cellRendererFramework: params => 
         <IconButton onClick={()=> deleteTraining(params.value)}>
         <DeleteIcon />
       </IconButton>
     },
        
      ]     
  
    return(
        <div>
            <div className="ag-theme-material" style={{ height: 600, width: '85%', margin: 'auto' }}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={8}
                floatingFilter={true}
                suppressCellSelection={true}
             />
            </div>
          
        </div>
    )
}

export default Traininglist;

