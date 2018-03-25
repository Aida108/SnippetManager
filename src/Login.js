import React, { Component } from 'react'
import './Login.css'
import axios from 'axios'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.username + ' ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.username} onChange={this.handleUserNameChange} />
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login
