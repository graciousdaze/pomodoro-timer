class Pomodoro extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      minutes: "25",
      seconds: "00",
      countDown: ''
    });
    this.toggleOn = this.toggleOn.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }
  toggleOn(e){
    let change = e.target.id;
    clearInterval(this.state.countDown);
    switch(change){
      case 'study':
        this.setState({
          minutes: "25",
          seconds: "00",
          countDown: ''
        });
        break;
      case 'short-break':
        this.setState({
          minutes: "5",
          seconds: "00",
          countDown: ''
        });
        break;
      case 'long-break':
        this.setState({
          minutes: "15",
          seconds: "00",
          countDown: ''
        });
        break;
    }
  }
  start(){
    if(this.state.countDown == ''){
      this.setState({
      countDown: setInterval(()=>{
        console.log("counting...");
        var secs = parseInt(this.state.seconds) + (parseInt(this.state.minutes) * 60) - 1;
        this.setState({
          seconds:  ("0" + (secs % 60).toString()).slice(-2),
          minutes: (secs - (secs % 60)) / 60
        });
        if(this.state.minutes == 0 && this.state.seconds == 0){
          clearInterval(this.state.countDown);
          meow.play();
        }
      }, 1000)
    });
    }
  }
  stop(){
    clearInterval(this.state.countDown);
    this.setState({
      countDown: ''
    })
  }
  render(){
    return (
      <div>
        <div id="kitty">
            <h1>Pomodoro Timer</h1>
        </div>
        <div id="time">
          <p>{this.state.minutes}:{this.state.seconds}</p>
       </div>
        <div id="buttons">
          <div id="study" onClick={this.toggleOn} className="buttons">
            <p>Work <br />Time</p>
          </div>
          <div id="short-break" onClick={this.toggleOn} className="buttons">
            <p>Short <br/>Break</p>
          </div>
          <div id="long-break" onClick={this.toggleOn} className="buttons">
            <p>Long <br />Break</p>
          </div>
        </div>
       <div id="tracking">
          <button id="start" onClick={this.start}>Start</button>
          <button id="stop" onClick={this.stop}>Stop</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Pomodoro />, document.getElementById("root"));