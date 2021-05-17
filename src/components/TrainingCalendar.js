import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

function TrainingCalendar () {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  let trainingTimes = [];

  if (trainings.length > 0) {
    trainings.forEach(function(event) {
      trainingTimes.push({
        'title': `${event.activity} ${moment(event.date).format('HH')}:${moment(event.date).format('mm')} // ${event.customer.firstname}  ${event.customer.lastname}`, 
        'allDay': false, 
        'start': new Date(
          moment(event.date).format('YYYY'), 
          moment(event.date).format('MM') - 1,
          moment(event.date).format('DD'), 
          moment(event.date).format('HH'),
          moment(event.date).format('mm'),
        ), 
        'end': new Date(
          moment(event.date).format('YYYY'), 
          moment(event.date).format('MM') -1, 
          moment(event.date).format('DD'), 
          moment(event.date).clone().add(event.duration, 'minutes').format('HH'), 
          moment(event.date).clone().add(event.duration, 'minutes').format('mm')
        )
      })
    });
  }
  
  return (
  <div>
    <Calendar
      localizer={localizer}
      events={trainingTimes}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
  )
}

export default TrainingCalendar;