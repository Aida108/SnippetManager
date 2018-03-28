import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Css/Login.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="login_container">
        <div className="login_app_name">
          <div className="login_app_name_text">
            Snippets Manager
          </div>
        </div>
        <div className="login_message_text">
          <span>Makes your life easeier!</span>
        </div>
            {
                !isAuthenticated() && (
                    <div className="btn_login">
                      <a href="#" class="btn btn-sm animated-button sandy-three" onClick={this.login.bind(this)}>Login with GitHub</a>
                    </div>
                 )
            }
            {
                isAuthenticated() && (
                    <Button
                      id="qsLogoutBtn"
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.logout.bind(this)}>
                      Log Out
                    </Button>
                  )
            }
      </div>
    );
  }
}

export default App;
