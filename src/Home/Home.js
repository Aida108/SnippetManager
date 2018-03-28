import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
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

  createNewGist(opts) {
     const { getAccessToken } = this.props.auth;






  fetch('https://api.github.com'+'/gists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'bearer-' + `${getAccessToken()}`,
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

      console.log(localStorage.getItem('user'));
  var content = document.getElementById("snippets_editor").value;
  var name=document.getElementById("snippets_name").value;
  if (content) {
    var opts={
      description: document.getElementById("snippet_description").value,
      public: true,
      files: {
        'test.js': {
          content: content
        }
      },
        user: localStorage.getItem('user')
    }
    this.createNewGist(opts);
  } else {
    alert('Please enter in content to POST to a new Gist.');
  }
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
 const { profile } = this.state;

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
             <div className="right">
             <label>List of { localStorage.getItem('user_nick_name')} snippets</label>
                 <ul>
                 {
                   this.state.gists.map(gist =>
                     Object.entries(gist.files).map(function([k,v]) {
                      return <div id={gist.files[k].raw_url}>
                                  {gist.files[k].filename}
                             </div>
                    })
                 )}
                </ul>
             </div>
             <div className="left">
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
