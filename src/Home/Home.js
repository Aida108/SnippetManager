import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import '../Css/Home.css';
import axios from 'axios';
import { AUTH_CONFIG } from '../Auth/auth0-variables';
const API_URL = 'https://api.github.com/users/';

class Home extends Component {

  componentWillMount() {
   this.setState({ profile: {} });
   const { userProfile, getProfile } = this.props.auth;
   if (!userProfile) {
     getProfile((err, profile) => {
       this.setState({ profile });
     });
   } else {
     this.setState({ profile: userProfile });
   }
 }

  constructor(){
    super();
    this.state = {
                gists : []
            }
    this.createNewGist = this.createNewGist.bind(this);
    this.CommitNewGist = this.CommitNewGist.bind(this);
    this.getGithubToken = this.getGithubToken.bind(this);
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

  getGithubToken(){
    var request = require("request");

  var options = { method: 'POST',
    url: 'https://snippetmanager.eu.auth0.com/api/v2/users/'+ localStorage.getItem('sub'),
    headers: { 'content-type': 'application/json' },
    body:
     { grant_type: 'client_credentials',
       client_id: 'B2bZ1z530ogAlbPqLRx3Z88pUfRJlRTs',
       client_secret: 'OjPmJR6-ZsUDECLl2gdUTGqL-zoE6U4Zs4BV8KzRLAPj02eLRzSde-LwjFWGsw8J',
       audience: 'https://snippetmanager.eu.auth0.com/api/v2/' },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });}

  createNewGist(opts) {
     const { getAccessToken } = this.props.auth;





console.log((opts));
  fetch('https://api.github.com'+'/gists', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
      'Authorization': 'Basic ' + `${getAccessToken()}`,
    },
    body: JSON.stringify(opts)
  }).then(function(response) {
    return response.json();
  }).then(function(myJson) {
    console.log(myJson);
  });
}

  CommitNewGist(e) {
    e.preventDefault();
  var content = document.getElementById("snippets_editor").value;
  var name=document.getElementById("snippets_name").value;
  if (content) {
    var opts={
      description: document.getElementById("snippet_description").value,

      owner: localStorage.getItem('user'),
      files: {
        'test.js': {
          content: content
        }
      }
    }
    this.createNewGist(opts);
  } else {
    alert('Please enter in content to POST to a new Gist.');
  }
}

  componentDidMount() {
     const { getAccessToken } = this.props.auth;
     fetch(API_URL + '/gists', {
   method: 'GET',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': 'Bearer ' + '268a215cd65cf87a369c3117fc788cc92f3c6af5',
       }
 })
                  .then(response => response.json())
                  .then(gists => this.setState({ gists }))

          }


  render() {
  const { isAuthenticated } = this.props.auth;
  const { profile } = this.state;

    return (
      <div className="home_container">
        {
          isAuthenticated() && (
            <div>
             {/*header of the Home page */}
<div className="home_header">
             <div className="rightColumn_header">
               <div className="btn_login_home ">
                     <a href="#" class="btn btn-sm animated-button sandy-three" onClick={this.logout.bind(this)}>Log Out</a>
               </div>
             </div>
             <div className="leftColumn_header">
               <div className="welcome_header">
                  <h3>Welcome { localStorage.getItem('user_nick_name')} !</h3>
                  <span className="home_about">
                    Snippets Manager allows you to manage your snippets stored on GitHub as gists.
                  </span>
              </div>
             </div>
             </div>
            {/*two columns in main part of the page */}

             <div>
             <div className="rightColumn">
             <label>List of { localStorage.getItem('user_nick_name')} snippets</label>
                 <table>
                 <tbody>

                 {
<div onClick={this.getGithubToken.bind(this)}>asdasd</div>
                  }
                 </tbody>
                </table>
             </div>
             <div className="leftColumn">
               <div className="snippets_buttons">
               <Button
                 id="createNewSnippetBtn"
                 bsStyle="primary"
                 Type="submit"
                 className="btn-margin"
                 onClick={this.CommitNewGist.bind(this)} >
                 Create Snippet
               </Button>
               </div>
               <div>
             <textarea id="snippet_description" rows="10" cols="80"/>
             </div>
              <div> <textarea id="snippets_name" rows="10" cols="80"/>
              </div>
              <div>
  <textarea id="snippets_editor" rows="30" cols="80"/>
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
