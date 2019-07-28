import React from 'react';
import './App.css';

class BreakLength extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-sm-4 text-center" id="break-label">
        <div>BREAK</div>
        <button className="btn btn-primary" id="break-increment" onClick={this.props.dec}>DEC.</button>
        <p id="break-length" style={{"padding-top": "10px", "font-size": "25px"}}>{this.props.length}</p>
        <button className="btn btn-primary" id="break-decrement" onClick={this.props.inc}>INC.</button>
      </div>
    );
  }
}

class SessionLength extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-sm-4 text-center" id="session-label">
        <div>SESSION</div>
        <button className="btn btn-primary" id="session-increment" onClick={this.props.dec}>DEC.</button>
        <p id="session-length" style={{"padding-top": "10px", "font-size": "25px"}}>{this.props.length}</p>
        <button className="btn btn-primary" id="session-decrement" onClick={this.props.inc}>INC.</button>
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.seconds,
      running: false
    }
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.intervalID = null;
  }
  
  startStopTimer = () => {
    if(!this.state.running) {
      this.setState({
        running: true
      });
      this.intervalID = setInterval(() => {
        this.setState({
          seconds: this.props.seconds
        });
        this.props.start();
      }, 1000);
    }
    else {
      this.setState({
        running: false
      });
      clearInterval(this.intervalID);
    }
  }

  resetTimer = () => {
    clearInterval(this.intervalID);
    this.props.reset();
    this.setState({
      seconds: 1500,
      running: false
    });
  }

  render() {
    return (
      <div className="col-sm-4 text-center" id="timer">
        <div id="timer-label">{this.props.label.toUpperCase()}</div>
        <div className="text-monospace font-weight-bolder" id="time-left" style={{"font-size" : "50px"}}>{
          ((Math.floor(this.state.seconds/60)<10)?'0':'')+Math.floor(this.state.seconds/60)}:{((this.state.seconds%60<10)?'0':'')+this.state.seconds%60
        }</div>
        <button className="btn btn-danger" id="start_stop" onClick={this.startStopTimer}>Start/Stop</button>&nbsp;&nbsp;
        <button className="btn btn-success" id="start_stop" onClick={this.resetTimer}>Reset</button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break_length: 5,
      session_length: 25,
      label: "session",
      seconds: 1500
    }
    this.inc_break = this.inc_break.bind(this);
    this.dec_break = this.dec_break.bind(this);
    this.inc_session = this.inc_session.bind(this);
    this.dec_session = this.dec_session.bind(this);
    this.reset = this.reset.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  inc_break = () => {
    if(this.state.break_length!=60) {
      this.setState( {
        break_length: this.state.break_length+1
      });
    }
  }

  dec_break = () => {
    if(this.state.break_length!=1) {
      this.setState( {
        break_length: this.state.break_length-1
      });
    }
  }

  inc_session = () => {
    if(this.state.session_length!=60) {
      this.setState( {
        session_length: this.state.session_length+1,
        seconds: this.state.seconds+60
      });
    }
  }

  dec_session = () => {
    if(this.state.session_length!=1) {
      this.setState( {
        session_length: this.state.session_length-1,
        seconds: this.state.seconds-60
      });
    }
  }

  reset = () => {
    this.setState({
      break_length: 5,
      session_length: 25,
      label: "session",
      seconds: 1500
    });
  }

  startTimer = () => {
    console.log(this.state.seconds);
    if(this.state.seconds==0) {
      let newLabel = "session";
      if(this.state.label == newLabel)
        newLabel = "break";
      let newTime = this.state[newLabel+'_length']*60;
      this.setState({
        label: newLabel,
        seconds: newTime
      });
    }
    else {
      this.setState({
        seconds: this.state.seconds-1
      });
    }
  }
  
  render() {
    return (
      <div style={{"padding-top": "30px"}}>
        <div className="row center">
          <BreakLength length={this.state.break_length} inc={this.inc_break} dec={this.dec_break}/>
          <Timer label={this.state.label} seconds={this.state.seconds} start={this.startTimer} reset={this.reset}/>
          <SessionLength length={this.state.session_length} inc={this.inc_session} dec={this.dec_session}/>
        </div>
      </div>
    );
  }
}

export default App;
