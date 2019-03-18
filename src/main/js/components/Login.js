'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'

/** ----- CSS/STYLING IMPORTS -----**/
import "../../resources/static/css/login.css";
import "../../resources/static/css/select-task.css";


/** ----- COMPONENT IMPORTS ------ **/


/**
 * This JS file contains all code related to the rendering of the 'Login' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUserChange(e) {
        this.setState({user: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault(); // stop it from posting info
        if((this.state.user).toString().trim() == "user" && (this.state.password).toString().trim() == "password"){
            console.log('redirecting...');
            this.props.history.push('/selectTask');
        }
    }

    /**
     * Displays the login page
     */
    render() {
        return (
            <div id="login-page" className={"page login-page"}>
                <div className="loginbox">
                    <div className="content">
                        <form onSubmit={this.handleSubmit}>
                            <h1>WELCOME</h1>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faUser}/>
                                <input type="text" name="username" value={this.state.user} onChange={this.handleUserChange}/>
                            </div>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faKey}/>
                                <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                            </div>
                            <div className="btn">
                                <button type="submit" name="Login">
                                    LOG IN
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export class SelectTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {clicked: false};
        this.cancel = this.cancel.bind(this);
        this.goToCustomerPage = this.goToCustomerPage.bind(this);
        this.goToStaffPage = this.goToStaffPage.bind(this);
        this.goToManagerPage = this.goToManagerPage.bind(this);
    }

    cancel(e) {
        e.preventDefault();
        this.props.history.push('/login');
    }

    goToCustomerPage(e) {
        e.preventDefault();
        this.props.history.push('/customer');
    }

    goToStaffPage(e) {
        e.preventDefault();
        this.props.history.push('/staff');
    }

    goToManagerPage(e) {
        e.preventDefault();
        this.props.history.push('/manager');
    }

    render() {
        return (
            <div id="main-st" className={"page main-st"}>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
                    <div className="bg-st">
                        <i className="glyphicon glyphicon-remove" onClick={this.cancel}/>
                        <h1 style={{color: 'aliceblue', fontFamily: '"Lucida Sans"'}}>Select Task</h1>
                        <div className="column-st" onClick={this.goToCustomerPage}>
                            <h2 className="header-st" style={{top: '50%', left: '8%'}}>Customer</h2>
                        </div>
                        <div className="column-st" onClick={this.goToStaffPage}>
                            <h2 className="header-st" style={{top: '50%', left: '45%'}}>Staff</h2>
                        </div>
                        <div className="column-st" onClick={this.goToManagerPage}>
                            <h2 className="header-st" style={{top: '50%', left: '77%'}}>Manager</h2>
                        </div>
                    </div>
                </div>
         );
     }
}