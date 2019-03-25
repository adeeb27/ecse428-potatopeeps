'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faWindowClose } from '@fortawesome/free-solid-svg-icons'

/** ----- CSS/STYLING IMPORTS -----**/
 import "../../resources/static/css/login.css";

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
        if((this.state.user).toString().trim() === "user" && (this.state.password).toString().trim() === "password"){
            console.log('redirecting...');
            this.setState({user: "", password:""});
            this.props.history.push('/select-task');
        }
        else if((this.state.user).toString().trim() !== "user"){
            alert("Invalid User Name");
        } else{
            alert("Invalid Password");
        }
    }

    /**
     * Displays the login page
     */
    render() {
        return (
            <div id="login-page" className={"page login-page"}>
                <div id="login-box">
                    <div id="login-content">
                        <form id="login-form" onSubmit={this.handleSubmit}>
                            <h1 id="login-welcome-header">WELCOME</h1>
                            <div className="form-group">
                                <FontAwesomeIcon icon={faUser}/>
                                <input type="text" name="username" className="login-input" value={this.state.user} onChange={this.handleUserChange}/>
                            </div>
                            <div className="form-group">
                                <FontAwesomeIcon icon={faKey}/>
                                <input type="password" name="password" className="login-input" value={this.state.password} onChange={this.handlePasswordChange}/>
                            </div>
                            <div className="btn">
                                <button className="btn btn-outline-primary" type="submit" name="Login">
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
            <div className="page select-page">
                <div id="main-st" className={"page main-st"}>
                    <div className="bg-st h-100">
                        <h1><FontAwesomeIcon icon={faWindowClose} id="select-task-cancel" onClick={this.cancel}/></h1>
                        <h1 id="select-task-header">Select Task</h1>
                        <div className="container-fluid h-75 top-drop">
                            <div className="row h-100">
                                <div className="col-4 column-st h-100" onClick={this.goToCustomerPage}>
                                    <div className="select-task-columns d-flex justify-content-center flex-column h-100">
                                        Customer
                                    </div>
                                </div>
                                <div className="col-4 column-st h-100" onClick={this.goToStaffPage}>
                                    <div className="select-task-columns d-flex justify-content-center flex-column h-100">
                                        Staff
                                    </div>
                                </div>
                                <div className="col-4 column-st h-100" onClick={this.goToManagerPage}>
                                    <div className="select-task-columns d-flex justify-content-center flex-column h-100">
                                        Manager
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

         );
     }
}