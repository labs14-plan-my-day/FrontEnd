import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class Alert extends React.Component {
    constructor() {
        super();
        this.state = {
          currentTime: '',
          alarmTime: ''
        };
        this.setAlarmTime = this.setAlarmTime.bind(this);
      }
    
      componentDidMount(){
        this.clock = setInterval(
          () => this.setCurrentTime(),
          1000
        )
        this.interval = setInterval(
          () => this.checkAlarmClock(),
        1000)
      }
    
      componentWillUnmount(){
        clearInterval(this.clock);
        clearInterval(this.interval);
      }
    
      setCurrentTime(){
        this.setState({
          currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
        });
      }
    
      setAlarmTime(event) {
        event.preventDefault();
        const inputAlarmTimeModified = event.target.value + ':00'
        this.setState({
          alarmTime: inputAlarmTimeModified
        })
      }
    
      checkAlarmClock(){
        if(this.state.alarmTime == 'undefined' || !this.state.alarmTime) {
          this.alarmMessage = "No Alert Set";
        } else {
          this.alarmMessage = "Alert Set For " + this.state.alarmTime;
          if(this.state.currentTime === this.state.alarmTime) {
            alert("Its " + this.state.alarmTime);
          } else {
            console.log("not yet");
          }
        }   
      }
    
      render() {
        return (
          <div>
          
            <h2>{this.state.currentTime}
            </h2>
            <h2>{this.alarmMessage}
            </h2>
            <form>
              <input type="time" onChange={this.setAlarmTime}></input>
            </form>
          </div>
        );
      }
    }
    

  export default withStyles(styles)(Alert);