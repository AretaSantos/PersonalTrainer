import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customerlist(){

    const [customers, setCustomers] = useState([]);
    const [msg, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchCustomers();
    },  []);

    const openSnackBar = () => {
        setOpen(true);
      }
    
      const closeSnackBar = () => {
        setOpen(false);
      }


    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

     const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
          method: 'POST',
          body: JSON.stringify(newCustomer),
          headers: { 'Content-type' : 'application/json'  }
        })
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
      }

    const updateCustomer = (customer, link) => {
        fetch(link, {
          method: 'PUT',
          body: JSON.stringify(customer),
          headers: { 'Content-type' : 'application/json'}
        })
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
      }
    

    const deleteCustomer = (link) => {
        
        if (window.confirm('Are you sure you want to delete this customer?')){
            fetch(link[0].href, {
                method: 'DELETE',
            })
            .then(response => {
                if(response.ok) {
                    fetchCustomers();
                    setMessage('Customer is deleted');
                    openSnackBar();
                }
                else
                alert('Something went wrong')
            })
            .catch(err => console.error(err))
        }
    }

    const addTraining = (newTraining) => {
      fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        body: JSON.stringify(newTraining),
        headers: { 'Content-type' : 'application/json' }
      })
      .then(response => {
        if(response.ok) {
          setMessage('Training added');
          openSnackBar();
          fetchCustomers();
        }
        else
          alert('Something went wrong');
      })
      .catch(err => console.error(err))
    }

      const columns = [
        { field: 'firstname', sortable: true, filter: true},
        { field: 'lastname', sortable: true, filter: true},
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true},
        { field: 'city', sortable: true, filter: true},
        { field: 'email', sortable: true, filter: true, },
        { field: 'phone', sortable: true, filter: true, },
        { 
            headerName: '',
            field: '_links.self.href',
            width: 100,
            cellRendererFramework: params => 
            <EditCustomer link={params.value} customer={params.data} updateCustomer={updateCustomer} />
          },
          { 
            headerName: '',
            field: 'links',
            width: 100,
            cellRendererFramework: params => 
            <IconButton onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon />
            </IconButton>
          },
          {
            headerName: '',
            field: 'links',
            cellRendererFramework: params => <AddTraining AddTraining={addTraining} params={params}/>
        }
      ]
     
    return(
        <div>
        <AddCustomer addCustomer={addCustomer}/>
        <div className="ag-theme-material" style={{ height: 600, width: '85%', margin: 'auto' }}>
            <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={8}
                floatingFilter={true}
                suppressCellSelection={true}
              />
            </div>
            <Snackbar
            open={open}
            message={msg}
            autoHideDuration={3000}
            onClose={closeSnackBar}/>
          </div>
    )
}

export default Customerlist;