import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Customerlist from './Customerlist'
import TrainingList from './TrainingList';
import TrainingCalendar from './TrainingCalendar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const Personaltrainerhome = () => {
 
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleTabs = (event, newValue) => {
        setSelectedTab(newValue)
    }

    return (
        <div>
            <AppBar position="static">
                <Tabs value={selectedTab} 
                centered
                position="static"
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabs}
                centered>
                    <Tab label="Trainings" />
                    <Tab label="Customers" />
                    <Tab label="Calendar" />
                </Tabs>
            </AppBar>
            {selectedTab === 0 && <TrainingList />}
            {selectedTab === 1 && <Customerlist />}
            {selectedTab === 2 && <TrainingCalendar />}
        </div>
    );
};

export default Personaltrainerhome;