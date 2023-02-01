// src/App.js

import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import {OfflineAlert} from './Alert';


class App extends Component {
  state = {
    events: [], 
    locations:[],
    eventCount:32,
    selectedLocation:'all'
  }



  updateEvents = (location, inputNumber) => {
    const {eventCount, seletedLocation} = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
        const eventsToShow=locationEvents.slice(0, eventCount);
        this.setState({
        events: eventsToShow,
        seletedLocation: location
        });
      });  
    } else {
      getEvents().then((events) => {
        const locationEvents = (seletedLocation === 'all') ?
        events :
        events.filter((event) => event.location === seletedLocation);
        const eventsToShow=locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          eventCount: inputNumber
        });
      })
    }
  }

   
  // updateEvents = (location, eventCount) => {
  //   const { numberOfEvents } = this.state;
  //   if (location === undefined) location = this.state.selectedLocation;
  //   getEvents().then((events) => {
  //     const locationEvents =
  //       location === 'all'
  //         ? events
  //         : events.filter((event) => event.location === location);
  //     eventCount = eventCount === undefined ? numberOfEvents : eventCount;
  //     this.setState({
  //       events: locationEvents.slice(0, eventCount),
  //       selectedLocation: location,
  //       numberOfEvents: eventCount,
  //     });
  //   });
  // };


  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        events = events.slice(0,this.state.numberOfEvents);
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }


  render() {
    return (
      <div className="App">
        <div className="offline-alert">
          {!navigator.onLine && (
         <OfflineAlert 
          text= {'You are currently offline. The event list may not be up-to-date.'}
          className='OfflineAlert'
         />)}
        </div>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        {/* <NumberOfEvents  eventCount={this.state.numberOfEvents}
            updateEvents={this.updateEvents}/> */}
        <NumberOfEvents updateEvents={this.updateEvents}/>
        <EventList events={this.state.events} />
    
      </div>
    );
  }
}

export default App;