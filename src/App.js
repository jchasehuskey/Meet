// src/App.js

import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
'./api';
import './nprogress.css';
import {OfflineAlert} from './Alert';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';


class App extends Component {
  state = {
    events: [], 
    locations:[],
    eventCount:32,
    selectedLocation:'all',
    showWelcomeScreen: undefined
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };


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
        console.log([eventsToShow], [eventCount]);
      })
    }
  }



  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    let shouldGetEvents;
    if (navigator.onLine) {
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      shouldGetEvents = (code || isTokenValid) && this.mounted;
    } else {
      shouldGetEvents = accessToken && this.mounted;
      this.setState({showWelcomeScreen: false});
    }

    if (shouldGetEvents) {
      getEvents().then((events) => {
        if (this.mounted) {
          events=events.slice(0,this.state.eventCount);
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }


  componentWillUnmount(){
    this.mounted = false;
  }


  render() {
    console.log('state', this.state);
    const { locations, numberOfEvents, events } = this.state;
  

    if (this.state.showWelcomeScreen === undefined) return <div
    className="App"></div>
    

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
        <h4>Events in each city</h4>
        <div className="data-container">
          <EventGenre events={events} />
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
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