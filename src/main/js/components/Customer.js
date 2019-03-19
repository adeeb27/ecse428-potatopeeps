'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import "../../resources/static/css/Customer.css";
import "../../resources/static/css/manager.css";
import "../../resources/static/css/style.css";
import "../../resources/static/css/external/bootstrap.min.css";
import {CustomerMenuItem} from "./subcomponents/MenuItem";


/**
 * This JS file contains all code related to the rendering of the 'Customer' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

/***
 * Holds entire page view. Customer Landing page
 * TODO: should include search by Tag bar (drop-down selectable items)
 * @See Tag
 *
 */

export class Customer extends React.Component {

    constructor(props) {
        super(props);
        this.mainPage = 0;
        this.requestWaiter = 1;
        this.billRequest = 2;
        this.cartNum = 3;
        this.appetizer = 4;
        this.mainCourse = 5;
        this.drink = 6;
        this.dessert = 7;
        this.state = { selectedView: 'Customer', pageNum: this.mainPage, pageType: "Main Page"};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.loadResourceFromServer('menuItems', this.state.pageSize);
        this.props.loadResourceFromServer('tags', this.state.pageSize);
    }

    handleClick(button, menuCategory) {

        const tagList = this.props.tags.map(tag =>
            ({label: tag.entity.name, value: tag, key: tag.entity._links.self.href})
        );

        this.state = {pageNum: button, pageType: menuCategory};

        this.testTag = [];
        var index = tagList.map(function(d) { return d['label']; }).indexOf(menuCategory);
        this.testTag[0] = tagList[index];
        this.filteredList = [];
        this.filteredList = this.props.filterMenuItemList(this.testTag);

        this.setState( this.state );
    }

    render() {
        if (this.state.pageNum == this.mainPage) {
            return (

                <div>
                    <title>Welcome to PotatoPeeps Sushi</title>
                    <link rel="stylesheet" id="style-css" href="../../resources/static/css/Customer.css" type="text/css" media="all" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
                    <div id="wrapper">
                        <main className="main-wrapper">
                            <header className="frontpage">
                                <button className="landing-page-button" style={{zIndex: 1000}}>
                                    <i className="fas fa-user" style={{fontSize: '20px'}}>    Service Request</i>
                                </button>
                                <a href="#" className="logo">
                                    <img src="./img/logo.png" alt="Home" />
                                </a>
                                <button className="landing-page-button" style={{zIndex: 1000}}>
                                    <i className="fas fa-dollar-sign" style={{fontSize: '20px'}}>    Bill Request</i>
                                </button>
                                <button className="landing-page-button" style={{zIndex: 1000}}>
                                    <i className="fa fa-shopping-cart" style={{fontSize: '20px'}} />
                                </button>
                            </header>
                            <nav className="strokes">
                                <ul id="navigation">
                                    <li>
                                        <a href="#/customer" onClick={this.handleClick.bind(this, this.appetizer, "Appetizer")} data-transition="slide-to-top" className="internal">
                                            <section>
                                                <h1>Appetizer</h1><h5 className="badge-rounded">Healthy and Fresh</h5>
                                            </section>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/customer" onClick={this.handleClick.bind(this, this.mainCourse, "Main Course")} data-transition="slide-to-top" className="internal">
                                            <section>
                                                <h1>Main Course</h1><h5 className="badge-rounded">Skillfully crafted</h5>
                                            </section>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/customer" onClick={this.handleClick.bind(this, this.dessert, "Dessert")} data-transition="slide-to-top" className="internal">
                                            <section>
                                                <h1>Dessert</h1><h5 className="badge-rounded">Healthy and Fresh</h5>
                                            </section>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/customer" onClick={this.handleClick.bind(this, this.drink, "Drink")} data-transition="slide-to-top" className="internal">
                                            <section>
                                                <h1>Drink</h1><h5 className="badge-rounded">Skillfully crafted</h5>
                                            </section>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </main>
                    </div>
                    <a href="#" id="back-to-top">
                        <i className="icon bg icon-UpArrow" />
                    </a>
                    <ul id="slideshow">
                        <li style={{backgroundImage: 'url("./img/5.jpg")', display: 'block', zIndex: 0}} />
                        <li style={{backgroundImage: 'url("./img/3.jpg")', display: 'block', zIndex: 0, animationDelay: '6s'}} />
                        <li style={{backgroundImage: 'url("./img/6.jpg")', display: 'block', zIndex: 0, animationDelay: '12s'}} />
                        <li style={{backgroundImage: 'url("./img/4.jpg")', display: 'block', zIndex: 0, animationDelay: '18s'}} />
                        <li style={{backgroundImage: 'url("./img/2.jpg")', display: 'block', zIndex: 0, animationDelay: '24s'}} />
                    </ul>
                </div>
            );

        } else if (this.state.pageNum == this.appetizer || this.state.pageNum == this.mainCourse ||
            this.state.pageNum == this.dessert || this.state.pageNum == this.drink) {

            // const tagList = this.props.tags.map(tag =>
            //     ({label: tag.entity.name, value: tag, key: tag.entity._links.self.href})
            // );


            //TODO: Insert filtering of menuitems by tag, and pass that into menuItems
            return (
                <CustomerMenu selectedView={this.state.selectedView}
                              menuItems={this.props.menuItems} //I.E. pass filtered menuItems here
                              pageSize={this.props.pageSize}
                              attributes={this.props.attributes}
                              menuItemAttributes={this.props.menuItemAttributes}
                              menuItemLinks={this.props.menuItemLinks}
                              onNavigate={this.props.onNavigate}
                              updatePageSize={this.props.updatePageSize}
                              onUpdate={this.props.onUpdate}
                              onDelete={this.props.onDelete}
                              tags={this.props.tags}
                              tagName={this.state.pageType}
                               />

            )
        }
        else if (this.state.pageNum == this.cartNum) {
            return (
                <CustomerCartPage/>
            )
        }
        else if (this.state.pageNum == this.billRequest) {
            return (
                <CustomerCartPage/>
            )
        }
        else if (this.state.pageNum == this.requestWaiter) {
            return (
                <CustomerCartPage/>
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
        this.state = {pageSize: 10, clicked: false};
        // this.handleClick = this.handleClick.bind(this);

    }

    // handleClick() {
    //     this.state = {clicked: true};
    //     this.setState(this.state);
    //
    // }

    render() {
        const menuItems = this.props.menuItems.map(menuItem =>
            <CustomerMenuItem key={menuItem.entity._links.self.href}
                              menuItem={menuItem}
                              menuItemAttributes={this.props.menuItemAttributes}
            />
        );

            return (
                <div>
                    <title>Menu for Customer</title>
                    {/*<link rel="stylesheet" id="style-css" href="./asset/css/customerLanding.css" type="text/css"*/}
                          {/*media="all"/>*/}
                    {/*<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"*/}
                          {/*integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"*/}
                          {/*crossOrigin="anonymous"/>*/}
                    <div>
                        <main className>
                            <header className="detail full">
                                <a href="#/customer" className="back"
                                   data-transition="slide-from-top"/>
                                <section>

                                    <h1>{this.props.tagName}</h1>

                                </section>
                            </header>
                            <div className="content-wrap full-width">
                                <div className="gridViewContainer">
                                    {menuItems}
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

}

export class CustomerCartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false};
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        this.state = {clicked: true};
        this.setState(this.state);

    }

    render() {
        return (
            <div>
                <title>Cart</title>
                <link rel="stylesheet" id="style-css" href="../resources/static/css/style.css" type="text/css" media="all" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
                <div>
                    <main className>
                        <header className="detail full">
                            <a href="#/customer" className="back" data-transition="slide-from-top" />
                            <section>
                                <h1>Cart</h1>
                                <h3 className="page-badge">5 Items in Total</h3>
                            </section>
                        </header>
                        <div className="content-wrap full-width">
                            <div className="table-container">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col" />
                                        <th scope="col">Item</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col" />
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">
                                            <img className="item-preview" src="./img/4.jpg" />
                                        </th>
                                        <td>Food Name</td>
                                        <td>$58.00</td>
                                        <td>
                                            <div className="number-input">
                                                <button onClick="this.parentNode.querySelector('input[type=number]').stepDown()" />
                                                <input className="quantity" min={0} name="quantity" defaultValue={1} type="number" />
                                                <button onClick="this.parentNode.querySelector('input[type=number]').stepUp()" className="plus" />
                                            </div>
                                        </td>
                                        <td>$158.00</td>
                                        <td>
                                            <i className="far fa-times-circle" title="Remove" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <img className="item-preview" src="./img/4.jpg" />
                                        </th>
                                        <td>Food Name</td>
                                        <td>$58.00</td>
                                        <td>
                                            <div className="number-input">
                                                <button onClick="this.parentNode.querySelector('input[type=number]').stepDown()" />
                                                <input className="quantity" min={0} name="quantity" defaultValue={1} type="number" />
                                                <button onClick="this.parentNode.querySelector('input[type=number]').stepUp()" className="plus" />
                                            </div>
                                        </td>
                                        <td>$158.00</td>
                                        <td>
                                            <i className="far fa-times-circle" title="Remove" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <img className="item-preview" src="./img/4.jpg" />
                                        </th>
                                        <td>Food Name</td>
                                        <td>$58.00</td>
                                        <td>
                                            <div className="number-input">
                                                <button onClick="this.parentNode.querySelector('input[type=number]').stepDown()" />
                                                <input className="quantity" min={0} name="quantity" defaultValue={1} type="number" />
                                                <button onClick="this.parentNode.querySelector('input[type=number]').stepUp()" className="plus" />
                                            </div>
                                        </td>
                                        <td>$158.00</td>
                                        <td>
                                            <i className="far fa-times-circle" title="Remove" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <img className="item-preview" src="./img/4.jpg" />
                                        </th>
                                        <td>Food Name</td>
                                        <td>$58.00</td>
                                        <td>
                                            <div className="number-input">
                                                <button onClick="this.parentNode.querySelector('input[type=number]').stepDown()" />
                                                <input className="quantity" min={0} name="quantity" defaultValue={1} type="number" />
                                                <button onClick="this.parentNode.querySelector('input[type=number]').stepUp()" className="plus" />
                                            </div>
                                        </td>
                                        <td>$158.00</td>
                                        <td>
                                            <i className="far fa-times-circle" title="Remove" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <img className="item-preview" src="./img/4.jpg" />
                                        </th>
                                        <td>Food Name</td>
                                        <td>$58.00</td>
                                        <td>
                                            <div className="number-input">
                                                <button onClick="this.parentNode.querySelector('input[type=number]').stepDown()" />
                                                <input className="quantity" min={0} name="quantity" defaultValue={1} type="number" />
                                                <button onClick="this.parentNode.querySelector('input[type=number]').stepUp()" className="plus" />
                                            </div>
                                        </td>
                                        <td>$158.00</td>
                                        <td>
                                            <i className="far fa-times-circle" title="Remove" />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="button-container">
                                <button className="cart-help-button">
                                    <i className="fas fa-user" style={{fontSize: '20px'}}>    Request Staff</i>
                                </button>
                                <button className="cart-help-button">
                                    <i className="fas fa-sync-alt" style={{fontSize: '20px'}}>    Update Cart</i>
                                </button>
                                <span className="cart-total name">Cart Totals: </span>
                                <span className="cart-total amount">$200.00</span>
                                <button className="cart-help-button">
                                    <i className="fas fa-cart-arrow-down" style={{fontSize: '20px'}}>    Place Order</i>
                                </button>
                            </div>
                            <footer>
                                <div className="signature">
                                    <h6>Sushi</h6>
                                    <h5>PotatoPeeps</h5>
                                </div>
                            </footer>
                        </div>
                    </main></div>
                <a href="#" id="back-to-top">
                    <i className="icon bg icon-UpArrow" />
                </a>
                <ul id="slideshow">
                    <li style={{backgroundImage: 'url("./img/5.jpg")', display: 'block', zIndex: 0}} />
                    <li style={{backgroundImage: 'url("./img/3.jpg")', display: 'block', zIndex: 0, animationDelay: '6s'}} />
                    <li style={{backgroundImage: 'url("./img/6.jpg")', display: 'block', zIndex: 0, animationDelay: '12s'}} />
                    <li style={{backgroundImage: 'url("./img/4.jpg")', display: 'block', zIndex: 0, animationDelay: '18s'}} />
                    <li style={{backgroundImage: 'url("./img/2.jpg")', display: 'block', zIndex: 0, animationDelay: '24s'}} />
                </ul>
            </div>
        );
    }

}




