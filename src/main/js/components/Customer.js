'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import ReactDOM from "react-dom";

/** ----- CSS/STYLING IMPORTS -----**/
import "../../resources/static/css/select_table_num.css";

/**
 * This JS file contains all code related to the rendering of the 'Customer' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

/***
 * Holds entire page view.
 * TODO: should include search by Tag bar (drop-down selectable items)
 * @See Tag
 *
 */
export class Customer extends React.Component {

    constructor(props) {
        super(props);
        this.goToCustomerLanding = this.goToCustomerLanding.bind(this);
    }

    goToCustomerLanding(e) {
        e.preventDefault()
        return (
            <CustomerLanding/>
        )
    }

    render() {
        return (
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <link rel="stylesheet" id="style-css" href="../../resources/static/css/select_table_num.css" type="text/css" media="all"/>
                <title>Table number selection</title>
                <div className="background">
                    <div className="shadow">
                    </div>
                    <div className="content">
                        <div className="h-item">
                            <h2>Please select a table number</h2>
                        </div>
                        <div className="table">
                            <select className="tableID">
                                <option value="table1">Table No.1</option>
                                <option value="table2">Table No.2</option>
                                <option value="table3">Table No.3</option>
                            </select>
                        </div>
                        <div className="submit-button">
                            <button type="button" className="submit" onClick={this.goToCustomerLanding}>submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class CustomerLanding extends React.Component {

    render() {
        return (
            <div className="page customer-page">
                <div>
                    <main className="" style={{overflow: 'hidden scroll'}}>

                    </main>
                </div>

                <a href="#" id="back-to-top">
                    <i className="icon bg icon-UpArrow" />
                </a>


                <ul id="slideshow">
                    <li id="slideshow-5" />
                    <li id="slideshow-3" />
                    <li id="slideshow-6" />
                    <li id="slideshow-4" />
                    <li id="slideshow-2" />
                </ul>
            </div>
        )
    }
}

/***
 * Holds view of entire menu page
 * Should allow for parsing by tags, such that user inputs tags to search by
 * Then the corresponding menuItemList is added beneath
 * TODO: integrate UI of Customer, Parsing by Tags, ...
 */
export class CustomerMenu extends React.Component {

    render(){

    }
}

