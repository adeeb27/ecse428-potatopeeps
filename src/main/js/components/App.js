'use strict';

const root = '/api';
import React from "react";
import ReactDOM from "react-dom";
import client from "../client";
import follow from "../follow";
import {Route, NavLink, Switch} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";



import {Login} from "./Login";
import {Customer} from "./Customer";
import {Manager} from "./Manager";
import {Staff} from "./Staff";

// import "../../resources/static/css/style.css";
import "../../resources/static/css/route-transition.css";
// import "https://use.fontawesome.com/releases/v5.7.2/css/all.css";

/*
* This file is the React JS equivalent of Java's 'main' method, and
* is the entry point of the application.
*
* Note to everyone on the team - the majority of the components
* displayed below are unlikely to stay within this file, these are simply
* here to act as a proof of concept for the rest of the team and serve
* as reference for future code additions.
* */

export class App extends React.Component {

    render() {
        return (
            <div className="App">
                <div className="nav">
                    <div className="nav">
                        <NavLink exact to="/login">Login</NavLink>
                        <NavLink to="/staff">Staff</NavLink>
                        <NavLink to="/manager">Manager</NavLink>
                        <NavLink to="/customer">Customer</NavLink>
                    </div>
                </div>

                <Route render={({location}) => (
                    <TransitionGroup>
                        <CSSTransition key={location.pathname} timeout={30000} classNames="fade" >
                            <Switch location={location}>
                                <Route exact path={"/login"} component={Login}/>
                                <Route path={"/customer"} component={Customer}/>
                                <Route path={"/manager"} component={Manager}/>
                                <Route path={"/staff"} component={Staff}/>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )}/>
            </div>
        )
    }
}


// ReactDOM.render(
//     <App />,
//     document.getElementById('react')
// )