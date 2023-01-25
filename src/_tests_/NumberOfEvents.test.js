

// import React from 'react';
// import { shallow } from 'enzyme';
// import NumberOfEvents from '../NumberOfEvents';

// describe('<NumberOfEvents /> component', () => {
//   let NumberOfEventsWrapper;
//   beforeAll(() => {
//     NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={()=>{}}  />);
//   });

//   test('renders the component', () => {
//     expect(NumberOfEventsWrapper).toBeDefined();
//   });

//   test('default number of event value is 32', () => {
//     expect(NumberOfEventsWrapper.find('input.num').prop('type')).toBe('number');
//     expect(NumberOfEventsWrapper.state('num')).toBe(32);
//   });

//   test('user changes value for rendered number of events', () => {
//     expect(NumberOfEventsWrapper.state('num')).toBe(32);

//     NumberOfEventsWrapper.find('input.num').simulate('change', {
//       target: { value: 17 }
//     });
//     expect(NumberOfEventsWrapper.state('num')).toBe(17);
//   });

// })

import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render NumberOfEvents element', () => {
    expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('input.number')).toHaveLength(1);
    expect(NumberOfEventsWrapper.find('label')).toHaveLength(1);
  });
})



// import React, { Component } from 'react';
// import { shallow } from 'enzyme';
// // COMPONTENTS //////////
// import NumberOfEvents from '../NumberOfEvents';

// describe('<NumberOfEvents />', () => {
  
//   let NumberOfEventsWrapper, noeInput;
//   beforeAll(() => {
//     NumberOfEventsWrapper = shallow(<NumberOfEvents />);
//     noeInput = NumberOfEventsWrapper.find('input.noe-input');
//   });

//   test('<NumberOfEvents /> and noe-input are both rendered', () => {
//     expect(NumberOfEventsWrapper).toBeDefined();
//     expect(noeInput).toBeDefined();
//   });
  
//   test('noe-input is 10 (number type) by default', () => {
//     expect(NumberOfEventsWrapper.find('input.noe-input').prop('type')).toBe('number');
//     expect(NumberOfEventsWrapper.state('noe')).toBe(10);
//   })
  
//   test('noe-input is changed and the value is reflected correctly', () => {
//     expect(NumberOfEventsWrapper.state('noe')).toBe(10);
//     NumberOfEventsWrapper.find('input.noe-input')
//     .simulate('change', {
//       target: { value: 15 }
//     });
//     expect(NumberOfEventsWrapper.state('noe')).toBe(15);
//   })
// })