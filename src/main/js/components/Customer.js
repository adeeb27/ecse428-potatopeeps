'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faDollarSign, faUser, faBell} from "@fortawesome/free-solid-svg-icons";

/** ----- COMPONENT IMPORTS -----**/
import {CustomerDiningSessionSelect} from "./subcomponents/DiningSession";
import {MenuItemList} from "./subcomponents/MenuItem";

/** ----- CSS/STYLING IMPORTS -----**/
import "../../resources/static/css/customer.css";
/**
 * This JS file contains all code related to the rendering of the 'Customer' perspective.
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

/***
 *
 * Holds entire page view. Starting off with the Customer Landing page
 * @Author Adeeb Ibne Amjad, Dibbo Ritwik
 *
 */

export class Customer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selectedView: 'Customer'};
    }

    componentDidMount() {
        this.props.loadResourceFromServer('menuItems', 30);
        this.props.loadResourceFromServer('diningSessions', this.state.pageSize)
        this.props.loadResourceFromServer('tags', this.state.pageSize);
    }

    render() {
        //TODO: note passing customerDS to the <customer tag, however diningSessionLinks/Attributes arent parsed
        const customerDS = this.props.filterDiningSessionList('ta_status');
        /* TODO: figure out where to place the customerlandingpage tag or refactor via history.push
                    <CustomerLandingPage history={this.props.history}
                                 selectedView={this.state.selectedView}
                                 menuItems={this.props.menuItems}
                                 filterMenuItemList={this.props.filterMenuItemList}
                                 tags={this.props.tags}/>
         */
        return(
        <TableNumberSelect
            handleTableNumberSelect={this.handleTableNumberSelect}
            diningSessions={customerDS}
            diningSessionAttributes={this.props.diningSessionAttributes}
            history={this.props.history}
            onUpdate={this.props.onUpdate}/>
        );
    }
}

class TableNumberSelect extends React.Component{

    constructor(props){
        super(props);
        this.handleTableNumberSelect = this.handleTableNumberSelect.bind(this);
    }


    handleTableNumberSelect(e) {
        e.preventDefault();
        const updatedDiningSession = {};

        let selectedTableNumber = document.getElementById('table-select-dropdown').value

        updatedDiningSession['tableNumber'] = selectedTableNumber;
        updatedDiningSession['diningSessionStatus'] = 'ACTIVE';
        updatedDiningSession['serviceRequestStatus'] = 'INACTIVE';
        updatedDiningSession['billRequestStatus'] = 'INACTIVE';
        updatedDiningSession['tableAssignmentStatus'] = 'ASSIGNED';

        let oldDiningSession = this.props.diningSessions.find(function(session) {
            return session.entity.tableNumber === parseInt(selectedTableNumber, 10);
        });

        this.props.onUpdate(oldDiningSession, updatedDiningSession, 'diningSessions');
        //this.props.history.push('/CustomerLanding');
        this.props.history.push({
            pathname: '/CustomerLanding',
            state: {tableNum: selectedTableNumber} //TODO: make use of tableNum via this.props.location.state.tableNum
        });
    }


    render() {
        return (
            <div className="page customer-page">
                <div id="main-stn" className={"page main-stn"}>
                    <title>Table number selection</title>
                    <div className="background-stn">
                        <div className="shadow-stn">
                        </div>
                        <div className="content-stn">
                            <div className="h-item-stn">
                                <h2 className="h2-stn">Please select a table number</h2>
                            </div>
                            <div className="table">
                                <CustomerDiningSessionSelect diningSessions={this.props.diningSessions}/>
                            </div>
                            <div className="submit-button">
                                <button type="button" className="submit-stn" onClick={this.handleTableNumberSelect}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class CustomerLandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleTagClick = this.handleTagClick.bind(this);
    }

    handleTagClick(e, selectedTag){
        e.preventDefault();
        this.props.filterMenuItemList('Customer', [selectedTag]).then((response) => {
            this.props.history.push({
                pathname: '/customer-menu',
                state: {
                    tagName: selectedTag,
                    menuItems: response,
                    selectedView: this.props.selectedView,
                    customerFilter: this.props.customerFilter,
                    filterMenuItemList: this.props.filterMenuItemList,
                    tableNum: this.props.location.state.tableNum}
            })
        });
    }

    render(){
        const tags = this.props.tags.map(tag =>
            <li key={"customer-landing-li-" + tag.entity._links.self.href}>
               <a href ="#" key={"customer-landing-a-" + tag.entity._links.self.href} onClick={(e) => this.handleTagClick(e, tag.entity.name)}  data-transition="slide-to-top" className="internal">
                   <section key={"customer-landing-section-" + tag.entity._links.self.href}>
                       <h1 key={"customer-landing-h1-" + tag.entity._links.self.href}>{tag.entity.name}</h1>
                       <div>
                           <h5 className="staff-badge-rounded" key={"customer-landing-h5-" + tag.entity._links.self.href}>{"View " + tag.entity.name + "s"}</h5>

                       </div>
                   </section>
               </a>
            </li>
        );

        return(
            <div>
                <title>Welcome to PotatoPeeps Sushi</title>
                <div id="wrapper">
                    <main className="staff-main-wrapper">
                        <header className="staff-frontpage">
                            <a href="#" className="staff-logo">
                                <img src="./img/logo.png" alt="Home" />
                            </a>
                            <button className="landing-page-button" style={{zIndex: 1000}}>
                                <FontAwesomeIcon icon={faBell} className="landing-page-header-button-icons"/>
                                Request Service
                            </button>
                            <button className="landing-page-button" style={{zIndex: 1000}}>
                                <FontAwesomeIcon icon={faDollarSign} className="landing-page-header-button-icons"/>
                                Request Bill
                            </button>
                            <button className="landing-page-button" style={{zIndex: 1000}}>
                                <FontAwesomeIcon icon={faShoppingCart} className="landing-page-header-button-icons"/>
                                View Your Cart
                            </button>
                        </header>
                        <nav className="staff-strokes">
                            <ul id="navigation">
                                {tags}
                            </ul>
                        </nav>
                    </main>
                </div>
                <a href="#" id="back-to-top">
                    <i className="icon staff-bg staff-icon-UpArrow" />
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

/***
 *
 * Holds view of entire menu page parsed by tags, menu items are displayed
 * corresponding to the menu category page clicked on
 *
 */

export class CustomerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.state = {pageSize: 10, clicked: false};
    }

    handleCloseMenu(){
        this.props.history.push({
            pathname: '/CustomerLanding',
            state: {tableNum: this.props.location.state.tableNum} //TODO: make use of tableNum via this.props.location.state.tableNum
        });
    }

    render() {
            return (
                <div className="page customer-menu-page">
                    <div>
                        <main>
                            <header className="detail full">
                                <a className="back"
                                   onClick={this.handleCloseMenu}/>
                                <section>
                                    <h1>{this.props.location.state.tagName}</h1>
                                </section>
                            </header>
                            <MenuItemList selectedView={this.props.selectedView}
                                          menuItems={this.props.location.state.menuItems}
                                          pageSize={this.state.pageSize}
                                          menuItemTags={this.props.menuItemTags}
                                          filterMenuItemList={this.props.filterMenuItemList}
                                          tagName={this.props.location.state.tagName}
                                          filterMenuitemList={this.props.location.state.filterMenuItemList}/>
                        </main>
                    </div>
                </div>
            );
        }

}

// TODO: Implement functionality, take help from the above classes if necessary
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
                    <i className="icon staff-bg staff-icon-UpArrow" />
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




