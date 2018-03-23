import React, { Component } from 'react'
import './Login.css'
import axios from 'axios'

class Login extends Component {
	
	constructor () {
    super()
	this.state = {
    username: ''
  }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
  axios.get('https://api.github.com/users/Aida108')
    .then(response => console.log(response))
}
  render () {
    return (
	<div className="login__containter">
	  <span>Login</span>
	
	  <span>GitHub User Name:</span>
	  <input type="text" value="" />
	  <span>GitHub Password:</span>
	  <input type="text" value="" />
      <div className='button__container'>
        <button className='button' onClick={this.handleClick}>
		Click Me
		</button>
      </div>
	 </div>
    )
  }
}
export default Login
