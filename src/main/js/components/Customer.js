'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import Select from "react-select";
import ReactDOM from "react-dom";
import Button from "./Customer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import "../../resources/static/css/customerLanding.css";
import {ManagerCreateMenuItemDialog, MenuItemList} from "./subcomponents/MenuItem";

import "../../resources/static/css/manager.css";
import "../../resources/static/css/external/bootstrap.min.css";
import {ManagerCreateTagDialog} from "./subcomponents/Tag";
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
        this.state = {pageSize: 10, selectedView: 'Customer'};
    }

    componentDidMount() {
        this.props.loadResourceFromServer('menuItems', this.state.pageSize);
        this.props.loadResourceFromServer('tags', this.state.pageSize);
    }
    render() {
        return (
            <CustomerLanding/>
        )
    }

}


export class CustomerLanding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {clicked: false};
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        // this.setState({
        //     clicked: true
        //
        // });
        this.state = {clicked: true};
        this.setState(this.state)

    }

    render() {
        if (!this.state.clicked.valueOf()) {
            return (

                <div>
                    <title>Welcome to PotatoPeeps Sushi</title>
                    <link rel="stylesheet" id="style-css" href="./asset/css/customerLanding.css" type="text/css"
                          media="all"/>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
                          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
                          crossOrigin="anonymous"/>
                    <div id="wrapper">
                        <main className>
                            <header className="frontpage">
                                <button className="landing-page-button" style={{zIndex: 1000}}>
                                    <i className="fas fa-user" style={{fontSize: '20px'}}> Service Request</i>
                                </button>
                                <a href="#" className="logo">
                                    <img src="./img/logo.png" alt="Home"/>
                                </a>
                                <button className="landing-page-button" style={{zIndex: 1000}}>
                                    <i className="fas fa-dollar-sign" style={{fontSize: '20px'}}> Bill Request</i>
                                </button>
                                <button className="landing-page-button" style={{zIndex: 1000}}>
                                    <i className="fa fa-shopping-cart" style={{fontSize: '20px'}}/>
                                </button>
                            </header>
                            <nav className="strokes">
                                <ul id="navigation">

                                    <li>

                                        <a href="#/customer" onClick={this.handleClick}>
                                            <section>

                                                <h1>Appetizer</h1><h5 className="badge-rounded"> Spring roll, roasted
                                                peas, popcorn shrimp... </h5>

                                            </section>

                                        </a>
                                    </li>


                                    <li>
                                        <a href="#/customer" onClick={this.handleClick}>

                                            <section>
                                                <h1>Main Course</h1><h5 className="badge-rounded"> Chicken Curry,
                                                Vegetable Curry, Lamb Curry...</h5>
                                            </section>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/customer" onClick={this.handleClick}>
                                            <section>
                                                <h1>Drink</h1><h5 className="badge-rounded"> Coke, Sprite, Crush...</h5>
                                            </section>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/customer" onClick={this.handleClick}>
                                            <section>
                                                <h1>Dessert</h1><h5 className="badge-rounded">Green Tea Ice Cream, Deep
                                                Fried Banana...</h5>
                                            </section>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </main>
                    </div>
                    <a href="#/customer" id="back-to-top">
                        <i className="icon bg icon-UpArrow"/>
                    </a>
                    <ul id="slideshow">
                        <li style={{backgroundImage: 'url("./img/5.jpg")', display: 'block', zIndex: 0}}/>
                        <li style={{
                            backgroundImage: 'url("./img/3.jpg")',
                            display: 'block',
                            zIndex: 0,
                            animationDelay: '6s'
                        }}/>
                        <li style={{
                            backgroundImage: 'url("./img/6.jpg")',
                            display: 'block',
                            zIndex: 0,
                            animationDelay: '12s'
                        }}/>
                        <li style={{
                            backgroundImage: 'url("./img/4.jpg")',
                            display: 'block',
                            zIndex: 0,
                            animationDelay: '18s'
                        }}/>
                        <li style={{
                            backgroundImage: 'url("./img/2.jpg")',
                            display: 'block',
                            zIndex: 0,
                            animationDelay: '24s'
                        }}/>
                    </ul>
                </div>
            );
        } else if (this.state.clicked.valueOf()) {
            return (
                <CustomerMenu/>
            )
        }

    }

}

/***
 * Holds view of entire menu page
 * Should allow for parsing by tags, such that user inputs tags to search by
 * Then the corresponding menuItemList is added beneath
 * TODO: integrate UI of Customer, Parsing by Tags, ...
 */
export class CustomerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pageSize: 10, selectedView: 'Customer'};
        this.state = {clicked: false};
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        // this.setState({
        //     clicked: true
        //
        // });
        this.state = {clicked: true};
        this.setState(this.state)
        this.setState()

    }
    render() {
        if (!this.state.clicked.valueOf()) {
            return (
                <div>
                    <title>Menu for Customer</title>
                    <link rel="stylesheet" id="style-css" href="./asset/css/customerLanding.css" type="text/css"
                          media="all"/>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
                          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
                          crossOrigin="anonymous"/>
                    <div>
                        <main className>
                            <header className="detail full">
                                <a href="#/customer" onClick={this.handleClick} className="back"
                                   data-transition="slide-from-top"/>
                                <section>
                                    <h1>Category 1</h1>
                                    <h3 className="page-badge">Healthy and Fresh</h3>
                                </section>
                            </header>
                            <div className="content-wrap full-width">
                                <div className="gridViewContainer">
                                    <div className="gridViewItem">
                                        <img className="itemImage" draggable="false" src="./img/4.jpg"/>
                                        <div className="overlay">
                                            <div className="text">Hello World</div>
                                            <div className="text">$10.99</div>
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <button className="add-to-cart-button" title="Add to cart">
                                                    <i className="fa fa-shopping-cart" style={{fontSize: '20px'}}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gridViewItem">
                                        <img className="itemImage" draggable="false" src="./img/3.jpg"/>
                                        <div className="overlay">
                                            <div className="text">Hello World</div>
                                            <div className="text">$10.99</div>
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <button className="add-to-cart-button" title="Add to cart">
                                                    <i className="fa fa-shopping-cart" style={{fontSize: '20px'}}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gridViewItem">
                                        <img className="itemImage" draggable="false" src="./img/2.jpg"/>
                                        <div className="overlay">
                                            <div className="text">Hello World</div>
                                            <div className="text">$10.99</div>
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <button className="add-to-cart-button" title="Add to cart">
                                                    <i className="fa fa-shopping-cart" style={{fontSize: '20px'}}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gridViewItem">
                                        <img className="itemImage" draggable="false" src="./img/5.jpg"/>
                                        <div className="overlay">
                                            <div className="text">Hello World</div>
                                            <div className="text">$10.99</div>
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <button className="add-to-cart-button" title="Add to cart">
                                                    <i className="fa fa-shopping-cart" style={{fontSize: '20px'}}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gridViewItem">
                                        <img className="itemImage" draggable="false" src="./img/6.jpg"/>
                                        <div className="overlay">
                                            <div className="text">Hello World</div>
                                            <div className="text">$10.99</div>
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <button className="add-to-cart-button" title="Add to cart">
                                                    <i className="fa fa-shopping-cart" style={{fontSize: '20px'}}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gridViewItem">
                                        <img className="itemImage" draggable="false" src="./img/4.jpg"/>
                                        <div className="overlay">
                                            <div className="text">Hello World</div>
                                            <div className="text">$10.99</div>
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <button className="add-to-cart-button" title="Add to cart">
                                                    <i className="fa fa-shopping-cart" style={{fontSize: '20px'}}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gridViewItem">
                                        <img className="itemImage" draggable="false" src="./img/2.jpg"/>
                                        <div className="overlay">
                                            <div className="text">Hello World</div>
                                            <div className="text">$10.99</div>
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <button className="add-to-cart-button" title="Add to cart">
                                                    <i className="fa fa-shopping-cart" style={{fontSize: '20px'}}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <footer>
                                    <div className="signature">
                                        <h6>Sushi</h6>
                                        <h5>PotatoPeeps</h5>
                                    </div>
                                </footer>
                            </div>
                        </main>
                    </div>
                    <a href="#/customer" id="back-to-top">
                        <i className="icon bg icon-UpArrow"/>
                    </a>
                    <ul id="slideshow">
                        <li style={{backgroundImage: 'url("./img/5.jpg")', display: 'block', zIndex: 0}}/>
                        <li style={{
                            backgroundImage: 'url("./img/3.jpg")',
                            display: 'block',
                            zIndex: 0,
                            animationDelay: '6s'
                        }}/>
                        <li style={{
                            backgroundImage: 'url("./img/6.jpg")',
                            display: 'block',
                            zIndex: 0,
                            animationDelay: '12s'
                        }}/>
                        <li style={{
                            backgroundImage: 'url("./img/4.jpg")',
                            display: 'block',
                            zIndex: 0,
                            animationDelay: '18s'
                        }}/>
                        <li style={{
                            backgroundImage: 'url("./img/2.jpg")',
                            display: 'block',
                            zIndex: 0,
                            animationDelay: '24s'
                        }}/>
                    </ul>
                </div>
            );
        }
        else if (this.state.clicked.valueOf()) {
            return (
                <CustomerLanding/>
            )
        }
    }


}


