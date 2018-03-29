import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import '../Css/Home.css';
import axios from 'axios';
import { AUTH_CONFIG } from '../Auth/auth0-variables';
const API_URL = 'https://api.github.com/';

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
    this.state = {  gists : [] }
    this.createNewGist = this.createNewGist.bind(this);
    this.CommitNewGist = this.CommitNewGist.bind(this);
    this.getGithubToken = this.getGithubToken.bind(this);
    this.getSpecificGist = this.getSpecificGist.bind(this);
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
var tokenApi='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5EWkRSVVV6UmpNM1FUZzNNamMyUWtaQk5rRkVNVVkyUmpjd05qbEVOekpCTnpFelJETTNSZyJ9.eyJpc3MiOiJodHRwczovL3NuaXBwZXRtYW5hZ2VyLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJqY29LMjFMNFR6eE41SGtpbWJqc2pOZ0hHa2dUNVlaN0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9zbmlwcGV0bWFuYWdlci5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTUyMjI4NTk3NCwiZXhwIjoxNTIyMzcyMzc0LCJhenAiOiJqY29LMjFMNFR6eE41SGtpbWJqc2pOZ0hHa2dUNVlaNyIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.cvePGIjkWIGziWwf-4WiZxisg2A1AFZPTfrzTDH-YudsQ_0xThNvgqvS14TNWoNuYvi2Ufxd3EaBq4knM1a4HylHdak0q0RC3ZMv8O4GtQ8DVdO7lCFS4HGbpmDTNdfwLU7XXk-21lgLG_3HXr-NZrxsCf9mWPD7wWx1xPr2trJ4SYnDzbamUHHNZy-wmRqaGOWSGLz0YWauTB_FVVumHrJCBsXARhZjmQTN2slq00WlBNI51R7kwLFy0gW-Klr_NrH-hrr62jD4WRksqPY2ckvSJ5WYDj5Op5Mwr_2h-545ZAtXr1fO-IkFQmVNEUYAn5Y2l6XPCi0m6Jty9PYN2g';

  fetch('https://snippetmanager.eu.auth0.com/api/v2/users/'+ localStorage.getItem('sub'), {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenApi,
    }
    }).then(function(response) {
        return response.json();
    }).then(function(body) {
      console.log(body);
      console.log(  localStorage.getItem('sub'));
        localStorage.setItem('githubApi_token',body.identities[0].access_token)

    });
  }

  createNewGist(opts) {
  fetch('https://api.github.com'+'/gists', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('githubApi_token'),
    },
    body: JSON.stringify(opts)
    }).then(function(response) {
    alert("New Snippet created!")
    });
  }

  CommitNewGist(e) {
  e.preventDefault();
  var content = document.getElementById("snippets_editor").value;
  var name= document.getElementById("snippets_name").value;
  if (content) {
    var opts= {
      description: document.getElementById("snippet_description").value,
      owner: localStorage.getItem('user'),
      files: {
      [name] : {
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
    this.getGithubToken();
    fetch(API_URL + 'gists', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem('githubApi_token'),
          }
     }).then(response => response.json())
       .then(gists => this.setState({ gists }))
  }


 getSpecificGist(){

 }

  render() {
  const { isAuthenticated } = this.props.auth;
  let tagList;
  if(this.state.gists.length !=0)
  {
    tagList = (this.state.gists.map(gist =>
    Object.entries(gist.files).map(function([k,v]) {
     return <tr id={gist.files[k].raw_url} >
       <td>{gist.files[k].filename}</td>
    </tr>
    }.bind(this))))
}
else {
  tagList = (<div>No snippet found!</div>)
}

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
                <label className="label_listsnippets">List of { localStorage.getItem('user_nick_name')} snippets</label>
             <table className="snippets_table">
               <tbody>{tagList}</tbody>
              </table>
             </div>
             <div className="leftColumn">
               <div className="snippets_buttons">
                   <div className="btn_create_snippet ">
                         <a href="#" class="btn btn-sm animated-button sandy-three" onClick={this.CommitNewGist.bind(this)}>Create Snippet</a>
                   </div>
               </div>
               <div className="create_snippet_div">
               <div className="textarea_container">
                  <label className="label_snippet_name">Snippet Name</label>
                  <textarea id="snippets_name" rows="1" cols="60"/>
                 <label className="label_snippet_description">Snippet Description</label>
                 <textarea id="snippet_description" rows="9" cols="60"/>
               </div>
               <div className='textarea_container_content'>
                  <label className="label_snippet_content">Snippet Content</label>
                  <textarea id="snippets_editor" rows="13" cols="60"/>
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
