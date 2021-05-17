import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function AddTraining(props) {

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', 
        duration: '', 
        activity: '',
        customer: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleSave = () => {
        const newTraining = {
            ...training, date: new Date(training.date),
            customer: props.params.data.links[1].href,
            };
          props.AddTraining(newTraining);
          handleClose();
      }

      const inputChanged = (event) => {
      setTraining({...training, [event.target.name]: event.target.value})
      }
  

    return (
        <div>
        <Button style={{ marginTop: 10}}variant="outlined" color="default" onClick={handleClickOpen}>
           Add a new training
          </Button>
            <Dialog open={open}
             onClose={handleClose} 
             aria-labelledby="form-dialog-title"> 
                <DialogTitle id="form-dialog-title">New Training </DialogTitle>
                <DialogContent>
                    <TextField
                    margin="dense"
                    name="date"
                    value={training.date}
                    onChange={inputChanged}
                    label="Date (MM-DD-YYYY HH:MM)"
                    fullWidth
                    />
                    <TextField
                    margin="dense"
                    name="duration"
                    value={training.duration}
                    onChange={inputChanged}
                    label="Duration"
                    fullWidth
                    />
                    <TextField
                    margin="dense"
                    name="activity"
                    value={training.activity}
                    onChange={inputChanged}
                    label="Activity"
                    fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="default">
                        Cancel
                        </Button>
                        <Button onClick={handleSave} color="default">
                        Save
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTraining;