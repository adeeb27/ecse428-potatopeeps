import React from "react";
import "../../resources/static/css/login.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'


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
    }


    // Rudimentary form validation, should be expanded upon later
    // Placed here as an example for future use.
    validateForm() {
        return this.state.user.length > 0 && this.state.password.length;
    }


    /**
     * Displays the login page
     */
    render() {
        return (
            <div id="login-page" className={"page login-page"}>
                <div className="loginbox">
                    <div className="content">
                        <form>
                            <h1>WELCOME</h1>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faUser}/>
                                <input type="text" name="username"/>
                            </div>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faKey}/>
                                <input type="text" name="password"/>
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