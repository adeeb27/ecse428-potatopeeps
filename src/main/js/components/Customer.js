'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import ReactDOM from "react-dom";

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
    render() {
        return (
            <CustomerLanding /> // TODO: Clicking this should move the customer to the Menu page?
        )
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

