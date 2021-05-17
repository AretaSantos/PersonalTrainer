import React from 'react';
import './App.css';
import './components/Customerlist';
import './components/TrainingList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Personaltrainerhome from './components/Personaltrainerhome';


function App() {

  return (

    <div className="App">
      <AppBar position="static">
      <Toolbar>
        <Typography variant='h6'>
          Personaltrainer
        </Typography>
      </Toolbar>
      </AppBar>
      <Personaltrainerhome />
    </div>
  );
}

export default App;
