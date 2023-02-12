// src/App.js

import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
'./api';
// import { getEvents, extractLocations } from './api';
import './nprogress.css';
import {OfflineAlert} from './Alert';


class App extends Component {
  state = {
    events: [], 
    locations:[],
    eventCount:32,
    selectedLocation:'all',
    showWelcomeScreen: undefined
  }



  // updateEvents = (location, inputNumber) => {
  //   const {eventCount, seletedLocation} = this.state;
  //   if (location) {
  //     getEvents().then((events) => {
  //       const locationEvents = (location === 'all') ?
  //       events :
  //       events.filter((event) => event.location === location);
  //       const eventsToShow=locationEvents.slice(0, eventCount);
  //       this.setState({
  //       events: eventsToShow,
  //       seletedLocation: location
  //       });
  //     });  
  //   } else {
  //     getEvents().then((events) => {
  //       const locationEvents = (seletedLocation === 'all') ?
  //       events :
  //       events.filter((event) => event.location === seletedLocation);
  //       const eventsToShow=locationEvents.slice(0, inputNumber);
  //       this.setState({
  //         events: eventsToShow,
  //         eventCount: inputNumber
  //       });
  //     })
  //   }
  // }


  updateEvents = (location, inputNumber) => {
    const { eventCount } = this.state;
    if (location === undefined) location = this.state.selectedLocation;
    if (navigator.onLine) {
      getEvents().then((events) => {
        const locationEvents =
          location === 'all'
            ? events
            : events.filter((event) => event.location === location);
        inputNumber = inputNumber === undefined ? eventCount : inputNumber;
        this.setState({
          events: locationEvents.slice(0, inputNumber),
          selectedLocation: location,
          eventCount: inputNumber,
        });
        localStorage.setItem('events', JSON.stringify(events));
        localStorage.setItem('locations', JSON.stringify(extractLocations(events)));
      });
    } else {
      this.setState({
        events: JSON.parse(localStorage.getItem('events')) || [],
        locations: JSON.parse(localStorage.getItem('locations')) || [],
        selectedLocation: location,
        eventCount: inputNumber || eventCount,
      });
    }
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      if (navigator.onLine) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({
              events: events.slice(0, this.state.numberOfEvents),
              locations: extractLocations(events),
            });
            localStorage.setItem('events', JSON.stringify(events));
            localStorage.setItem('locations', JSON.stringify(extractLocations(events)));
          }
        });
      } else {
        this.setState({
          events: JSON.parse(localStorage.getItem('events')) || [],
          locations: JSON.parse(localStorage.getItem('locations')) || [],
        });
      }
    }
  }

  // updateEvents = (location, inputNumber) => {
  //   const { eventCount } = this.state;
  //   if (location === undefined) location = this.state.selectedLocation;
  //   getEvents().then((events) => {
  //     const locationEvents =
  //       location === 'all'
  //         ? events
  //         : events.filter((event) => event.location === location);
  //     inputNumber = inputNumber === undefined ? eventCount : inputNumber;
  //     this.setState({
  //       events: locationEvents.slice(0, inputNumber),
  //       selectedLocation: location,
  //       eventCount: inputNumber,
  //     });
  //   });
  // };
 

  // async componentDidMount() {
  //   this.mounted = true;
  //   const accessToken = localStorage.getItem('access_token');
  //   const isTokenValid = (await checkToken(accessToken)).error ? false : true;
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const code = searchParams.get('code');
  //   this.setState({ showWelcomeScreen: !(code || isTokenValid) });
  //   if ((code || isTokenValid) && this.mounted) {

  //     getEvents().then((events) => {
  //       if (this.mounted) {
  //         this.setState({
  //           events: events.slice(0, this.state.numberOfEvents),
  //           locations: extractLocations(events)
  //         });
  //       }
  //     });
  //   }
  // }





  componentWillUnmount(){
    this.mounted = false;
  }


  render() {

    const { locations, events, eventCount, showWelcomeScreen } = this.state;

    if (this.state.showWelcomeScreen === undefined) return <div
    className="App"></div>
    
  //   if (navigator.onLine) {
  //     console.log('online');
  //   } else {
  //     console.log('offline');
  //   }
  //   window.addEventListener('offline', (e) => { console.log('offline'); });

  //  window.addEventListener('online', (e) => { console.log('online'); });
    return (
      <div className="App">
        <div className="offline-alert">
          {!navigator.onLine && (
         <OfflineAlert 
          text= {'You are currently offline. The event list may not be up-to-date.'}
          // className='OfflineAlert'
         />)}

         
        </div>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents}/>
        <EventList events={this.state.events} />
        {/* <OfflineAlert/> */}
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
    
      </div>
    );
  }
}

export default App;