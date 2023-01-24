// import React, { Component } from 'react';

// class NumberOfEvents extends Component {
//   state = { num: 32 };

//   changeNum(value) {
//     this.setState({ num: value });
//   }

//   render() {
//     const { num } = this.state;

//     return (
//       <input
//         className='num'
//         type='number'
//         value={num}
//         onChange={(event) => {
//           this.changeNum(event.target.value);
//         }}
//       >
//       </input>
//     );
//   }
// }

// export default NumberOfEvents;

import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = { noe: 32 }

  handleInputChanged = (event, props) => {
    let inputValue = event.target.value;
    if(inputValue < 0) inputValue = 0;
    this.props.updateEvents(null, inputValue);
    this.setState({ noe: inputValue });
    console.log(this.props);
  }
  
  render() {
    const { noe } = this.state;
    return (
    <div className="NumberOfEvents">
        <h3># of Events:</h3>
        <input
          className="noe-input"
          type="number"
          value={noe}
          onChange={event => {
            this.handleInputChanged(event);
          }}
        >
        </input>
    </div>
    )
  }
}

export default NumberOfEvents;


// import React, { Component } from 'react';

// class NumberOfEvents extends Component {
//   state = { noe: 10 }

//   componentDidMount() {
//     this.setState({ noe: this.props.noe || 10 });
//   }

//   changeNOE(value) {
//     this.setState({ noe: value })
//   }

//   render() {
//     const { noe } = this.state;
//     return (
//     <div className="NumberOfEvents">
//         <h3>Number of Events:</h3>
//         <input
//           className="noe-input"
//           type="number"
//           value={noe}
//           onChange={event => {
//             this.changeNOE(event.target.value);
//           }}
//         >
//         </input>
//     </div>
//     )
//   }

// }

// export default NumberOfEvents;