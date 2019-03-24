'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faDollarSign,
    faUser,
    faBell,
    faUtensils,
    faHashtag,
    faCalculator
} from "@fortawesome/free-solid-svg-icons";


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
        this.state = {selectedView: 'Customer',
                      sentObject: {tableNum: 1, ordersToBeCreated: []},
                      selectedTableNumber: 0
        };
    }

    componentDidMount() {
        this.props.loadResourceFromServer('menuItems', 30);
        this.props.loadResourceFromServer('diningSessions', this.state.pageSize);
        this.props.loadResourceFromServer('tags', this.state.pageSize);
        this.props.loadResourceFromServer('orders', this.state.pageSize);
    }

    render() {
        const customerDS = this.props.filterDiningSessionList('ta_status');
        return(
        <TableNumberSelect
            customerSelectTableNumber={this.props.customerSelectTableNumber}
            handleTableNumberSelect={this.handleTableNumberSelect}
            diningSessions={customerDS}
            diningSessionAttributes={this.props.diningSessionAttributes}
            history={this.props.history}
            onUpdate={this.props.onUpdate}/>
        );
    };
}

class TableNumberSelect extends React.Component{

    constructor(props){
        super(props);
        this.handleTableNumberSelect = this.handleTableNumberSelect.bind(this);
    }
    
    handleTableNumberSelect(e) {
        e.preventDefault();
        const updatedDiningSession = {};

        let selectedTableNumber = document.getElementById('table-select-dropdown').value;

        updatedDiningSession['tableNumber'] = selectedTableNumber;
        updatedDiningSession['diningSessionStatus'] = 'ACTIVE';
        updatedDiningSession['serviceRequestStatus'] = 'INACTIVE';
        updatedDiningSession['billRequestStatus'] = 'INACTIVE';
        updatedDiningSession['tableAssignmentStatus'] = 'ASSIGNED';

        let oldDiningSession = this.props.diningSessions.find(function(session) {
            return session.entity.tableNumber === parseInt(selectedTableNumber, 10);
        });

        this.props.customerSelectTableNumber(selectedTableNumber);

        this.setState({
        selectedTableNumber: selectedTableNumber
        }, () => {
            this.props.onUpdate(oldDiningSession, updatedDiningSession, 'diningSessions');
            this.props.history.push({
                pathname: '/CustomerLanding',
                state: {selectedTableNumber: this.state.selectedTableNumber,
                    currentDiningSession: updatedDiningSession,
                    oldDiningSess: oldDiningSession,}
            });
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
        this.handleClick=this.handleClick.bind(this);
        this.handleViewCartClick = this.handleViewCartClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        const updatedDiningSession = {};

        this.props.updateDiningSession(this.props.location.state.currentDiningSession, updatedDiningSession,'serviceRequestStatus','ACTIVE');
        this.props.onUpdate(this.props.location.state.oldDiningSess, updatedDiningSession, 'diningSessions');

    }

    handleTagClick(e, selectedTag){
        e.preventDefault();
        this.props.filterMenuItemList('Customer', [selectedTag]).then((response) => {
            this.props.history.push({
                pathname: '/customer-menu',
                state: {
                    selectedTableNumber: this.props.location.state.selectedTableNumber,
                    tagName: selectedTag,
                    menuItems: response,
                    selectedView: this.props.selectedView,
                    customerFilter: this.props.customerFilter,
                    filterMenuItemList: this.props.filterMenuItemList,}
            })
        });
    }

    handleViewCartClick(e) {
        e.preventDefault();
        console.log("Handle View Cart Click: ", this.props.sentObject);
        this.props.history.push({
            pathname: '/customer-view-cart',
            state: {
                selectedView: this.props.selectedView,
                customerFilter: this.props.customerFilter,
                filterMenuItemList: this.props.filterMenuItemList,
            }
        })
    }

    render(){
        const tags = this.props.tags.map(tag =>
            <li key={"customer-landing-li-" + tag.entity._links.self.href}>
               <a href ="#" key={"customer-landing-a-" + tag.entity._links.self.href} onClick={(e) => this.handleTagClick(e, tag.entity.name)}  data-transition="slide-to-top" className="internal">
                   <section key={"customer-landing-section-" + tag.entity._links.self.href}>
                       <h1 key={"customer-landing-h1-" + tag.entity._links.self.href}>{tag.entity.name}</h1>
                       <div>
                           <h5 className="badge-rounded" key={"customer-landing-h5-" + tag.entity._links.self.href}>{"View " + tag.entity.name + "s"}</h5>

                       </div>
                   </section>
               </a>
            </li>
        );

        return(
            <div>
                <title>Welcome to PotatoPeeps Sushi</title>
                <div id="wrapper">
                    <main className="main-wrapper">
                        <header className="frontpage">
                            <a href="#" className="logo">
                                <img src="./img/logo.png" alt="Home" />
                            </a>
                            <button className="landing-page-button"  onClick={this.handleClick} style={{zIndex: 1000}}>
                                <FontAwesomeIcon icon={faBell} className="landing-page-header-button-icons"/>
                                Request Service
                            </button>
                            <button className="landing-page-button" style={{zIndex: 1000}}>
                                <FontAwesomeIcon icon={faDollarSign} className="landing-page-header-button-icons"/>
                                Request Bill
                            </button>
                            <button className="landing-page-button" style={{zIndex: 1000}} onClick={this.handleViewCartClick}>
                                <FontAwesomeIcon icon={faShoppingCart} className="landing-page-header-button-icons"/>
                                View Your Cart
                            </button>
                        </header>
                        <nav className="strokes">
                            <ul id="navigation">
                                {tags}
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
            state: {selectedTableNumber: this.props.location.state.selectedTableNumber,} //TODO: make use of tableNum via this.props.location.state.tableNum
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
                            <MenuItemList updateCustomerCart={this.props.updateCustomerCart}
                                          selectedTableNumber={this.props.location.state.selectedTableNumber}
                                          selectedView={this.props.selectedView}
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
        this.onCartCloseClick = this.onCartCloseClick.bind(this);
        this.handleQuantityChangeClick = this.handleQuantityChangeClick.bind(this);
        // this.calculateSingleOrderTotal = this.calculateSingleOrderTotal.bind(this);

    }

    handleClick() {
        this.state = {clicked: true};
        this.setState(this.state);
    }

    onCartCloseClick(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/CustomerLanding',
            state: {}
        });
    }

    handleQuantityChangeClick(e, direction, index){
        let quantity = 0;
        switch(direction){
            case('down'):
                e.target.parentNode.querySelector('input[type=number]').stepDown();
                quantity = e.target.parentNode.querySelector('input[type=number]').value;
                this.props.updateOrderQuantity(quantity, index);
                break;
            case('up'):
                e.target.parentNode.querySelector('input[type=number]').stepUp();
                quantity = e.target.parentNode.querySelector('input[type=number]').value;
                this.props.updateOrderQuantity(quantity, index);
                break;
        }
    }


    render() {

        const cartItems = this.props.sentObject.ordersToBeCreated.map((cartItem, index) =>
           <tr className="customer-cart-table-rows" key={"cart-item-row-" + cartItem.name}>
               <td key={"cart-item-td-1" + cartItem.name}/>
               <td scope="row" key={"cart-item-td-2" + cartItem.name}>{cartItem.name}</td>
               <td scope="row" key={"cart-item-td-3" + cartItem.name}>{"$" + cartItem.price.toFixed(2)}</td>
               <td key={"cart-item-td-4" + cartItem.name}>
                   <div className="number-input" key={"cart-item-td-4-div-" + cartItem.name}>
                        <button onClick={(e) => this.handleQuantityChangeClick(e, 'down', index)}
                                key={"cart-item-td-4-div-button-1-" + cartItem.name}/>
                        <input className="quantity" min={1} name="quantity" defaultValue={1} type="number"
                               key={"cart-item-td-4-div-input-1-" + cartItem.name}/>
                        <button className="plus" onClick={(e) => this.handleQuantityChangeClick(e, 'up', index)}
                                key={"cart-item-td-4-div-button-2-" + cartItem.name}/>
                    </div>
               </td>
               <td>{"$" + cartItem.orderTotal.toFixed(2)}</td>
               <td>
                   <button className="btn btn-outline-danger" onClick={(e) => this.props.removeCartItem(e, index)}>
                        Remove Cart Item
                   </button>
               </td>
           </tr>

        );


        return (
            <div className="page customer-cart-page">
                <div>
                    <title>Cart</title>
                    <main className="">
                        <header className="detail full">
                            <a onClick={this.onCartCloseClick} className="back" data-transition="slide-from-top" />
                            <section>
                                <h1>Cart</h1>
                                <h3 className="page-badge">
                                    {this.props.sentObject.ordersToBeCreated.length + " Items in Total"}
                                </h3>
                            </section>
                        </header>
                        <div className="content-wrap full-width">
                            <div className="table-container">
                                <table className="table" style={{color: 'white !important' }}>
                                    <thead>
                                    <tr className="customer-cart-table-rows" style={{color: 'white !important' }}>
                                        <th className="customer-cart-table-rows" scope="col" />
                                        <th className="customer-cart-table-rows" scope="col">
                                            <FontAwesomeIcon icon={faUtensils}/>
                                            Item
                                        </th>
                                        <th className="customer-cart-table-rows" scope="col">
                                            <FontAwesomeIcon icon={faDollarSign}/>
                                            Price
                                        </th>
                                        <th className="customer-cart-table-rows" scope="col">
                                            <FontAwesomeIcon icon={faHashtag}/>
                                            Quantity
                                        </th>
                                        <th className="customer-cart-table-rows" scope="col">
                                            <FontAwesomeIcon icon={faCalculator}/>
                                            Total
                                        </th>
                                        <th className="customer-cart-table-rows" scope="col" />
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartItems}
                                    </tbody>
                                </table>
                            </div>
                            <div className="button-container">
                                <button className="cart-help-button">
                                    <i className="fas fa-user" style={{fontSize: '20px'}}>    Request Staff</i>
                                </button>
                                <button onClick={this.onCartCloseClick} className="cart-help-button">
                                    <i className="fas fa-sync-alt" style={{fontSize: '20px'}}>    Update Cart</i>
                                </button>
                                <span className="cart-total-name customer-cart-table-rows">Cart Totals: </span>
                                <span className="cart-total amount">
                                    {(this.props.sentObject.ordersToBeCreated.length) === 0 ?
                                        "0.00" : "$" + this.props.sentObject.cartTotal.toFixed(2)}
                                </span>
                                <button className="cart-help-button" onClick={this.props.submitOrders}>
                                    <i className="fas fa-cart-arrow-down" style={{fontSize: '20px'}}>Place Your Order</i>
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
            </div>
        );
    }

}




