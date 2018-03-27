import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'https://api.github.com/users/';

class Home extends Component {
  constructor(){
    super();
    this.state = {
                gists : []
            }
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
     const { getAccessToken } = this.props.auth;
     fetch(API_URL +  localStorage.getItem('user_nick_name') + '/gists', {
   method: 'GET',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': 'bearer-' + `${getAccessToken()}`,
       }
 })
                  .then(response => response.json())
                  .then(gists => this.setState({ gists }))
          }


  render() {
  const { isAuthenticated } = this.props.auth;
console.log(this.state.gists)
{this.state.gists.map(gist =>
Object.keys(gist).map(function(k) { console.log(k); return  })
)}
    return (

      <div className="container">
        {
          isAuthenticated() && (
            <div>
             {/*header of the Home page */}
             <div className="header">
                <h3>Welcome { localStorage.getItem('user_nick_name')} !</h3>
                <Button
                  id="qsLogoutBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)} >
                  Log Out
                </Button>
                <span className="app__description">
                   Snippets Manager application will make your life easier!
                </span>
                <span className="app_about">
                  Application is able to manage user’s snippets stored on GitHub as gists.
                </span>
             </div>
            {/*two columns in main part of the page */}

             <div className="container">
                 <div className="row">
                     <div className="col-fixed-340">a</div>
                     <div className="col-md-12 col-offset-400">

                         <div className="row">
                         <ul>

                                          </ul>
                         </div>
                     </div>
                 </div>
             </div>
             </div>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}


var createReactClass = require('create-react-class');



export default Home;
