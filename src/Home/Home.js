
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../Css/Home.css';
const API_URL = 'https://api.github.com/';

class Home extends Component {
  constructor(){
    super();
    this.state = {  gists : [] }
    this.createNewGist = this.createNewGist.bind(this);
    this.CommitNewGist = this.CommitNewGist.bind(this);
    this.getSpecificGist = this.getSpecificGist.bind(this);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
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

getGists() {
  fetch(API_URL + 'gists', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' +  localStorage.getItem('githubApi_token'),
        }
   }).then(response => response.json())
     .then(data => {
       let gistsData = data.map((gist) =>
       Object.entries(gist.files).map(function([k,v]) {
        return <tr id={gist.files[k].raw_url} >
          <td>{gist.files[k].filename}</td>
       </tr>
     }))
   this.setState({gists:gistsData});})
}

componentDidMount(){
    this.getGists();
}

 getSpecificGist(){

 }

  render() {
  const { isAuthenticated } = this.props.auth;
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
               <tbody>{this.state.gists}</tbody>
              </table>
             </div>
             <div className="leftColumn">
             <table>
               <tbody>
               <tr>
               <td>
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
               </td>
               </tr>
               </tbody>
               </table>
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

export default Home;
