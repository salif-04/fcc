import React from 'react';
import aud1 from './sounds/clap.wav';
import aud2 from './sounds/hihat.wav';
import aud3 from './sounds/kick.wav';
import aud4 from './sounds/openhat.wav';
import aud5 from './sounds/boom.wav';
import aud6 from './sounds/ride.wav';
import aud7 from './sounds/snare.wav';
import aud8 from './sounds/tom.wav';
import aud9 from './sounds/tink.wav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.playAudio = this.playAudio.bind(this);
    this.getTarget = this.getTarget.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", (event) => {
      const keys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];
      let id = event.key;
      if(keys.includes(id)) {
        this.playAudio(id);
      }
    })
  }

  getTarget = (event) => {
    this.playAudio(event.target.id);
  } 

  playAudio = (keyId) => {
    let corrAud = "aud-"+keyId;
    let audFile = document.getElementById(corrAud);
    if(!audFile) {
      return;
    }
    audFile.currentTime = 0;
    audFile.play();
    document.getElementById("display").innerHTML = keyId;
  }

  render() {
    return (
      <div className="container" style={{"paddingTop": "20px"}}>
        <div className="text-center"><h1>DRUM MACHINE</h1></div>
        <div className="mx-auto" id="drum-machine">
          <div className="text-center" id="display" style={{"fontSize": "180px"}}>&nbsp;</div>
          <div className="row" style={{"fontSize": "50px"}}>
            <button id="q" className="drum-pad" onClick={this.getTarget}>Q</button>&nbsp;
            <button id="w" className="drum-pad" onClick={this.getTarget}>W</button>&nbsp;
            <button id="e" className="drum-pad" onClick={this.getTarget}>E</button>&nbsp;
            <button id="a" className="drum-pad" onClick={this.getTarget}>A</button>&nbsp;
            <button id="s" className="drum-pad" onClick={this.getTarget}>S</button>&nbsp;
            <button id="d" className="drum-pad" onClick={this.getTarget}>D</button>&nbsp;
            <button id="z" className="drum-pad" onClick={this.getTarget}>Z</button>&nbsp;
            <button id="x" className="drum-pad" onClick={this.getTarget}>X</button>&nbsp;
            <button id="c" className="drum-pad" onClick={this.getTarget}>C</button>
          </div>
        </div>
        <div>
          <audio id="aud-q" className="clip" type="audio/wav" src={aud1}></audio>
          <audio id="aud-w" className="clip" type="audio/wav" src={aud2}></audio>
          <audio id="aud-e" className="clip" type="audio/wav" src={aud3}></audio>
          <audio id="aud-a" className="clip" type="audio/wav" src={aud4}></audio>
          <audio id="aud-s" className="clip" type="audio/wav" src={aud5}></audio>
          <audio id="aud-d" className="clip" type="audio/wav" src={aud6}></audio>
          <audio id="aud-z" className="clip" type="audio/wav" src={aud7}></audio>
          <audio id="aud-x" className="clip" type="audio/wav" src={aud8}></audio>
          <audio id="aud-c" className="clip" type="audio/wav" src={aud9}></audio>
        </div>
      </div>
    );
  }
}

export default App;
