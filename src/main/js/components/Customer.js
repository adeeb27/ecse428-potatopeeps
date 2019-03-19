'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import "../../resources/static/css/Customer.css";
import "../../resources/static/css/manager.css";
import "../../resources/static/css/style.css";
import "../../resources/static/css/external/bootstrap.min.css";
import {MenuItemList} from "./subcomponents/MenuItem";

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
        this.props.loadResourceFromServer('tags', this.state.pageSize);
    }

    render() {

        return(
            <CustomerLandingPage history={this.props.history}
                                 selectedView={this.state.selectedView}
                                 menuItems={this.props.menuItems}
                                 filterMenuItemList={this.props.filterMenuItemList}
                                 tags={this.props.tags}/>
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
        this.props.filterMenuItemList([selectedTag]).then((response) => {
            this.props.history.push({
                pathname: '/customer-menu',
                state: {
                    tagName: selectedTag,
                    menuItems: response,
                    selectedView: this.props.selectedView,
                    customerFilter: this.props.customerFilter,
                    filterMenuItemList: this.props.filterMenuItemList}
            })
        });
    }

    render(){
        const tags = this.props.tags.map(tag =>
            <li key={"customer-landing-li-" + tag.entity._links.self.href}>
               <a key={"customer-landing-a-" + tag.entity._links.self.href} onClick={(e) => this.handleTagClick(e, tag.entity.name)}  data-transition="slide-to-top" className="internal">
                   <section key={"customer-landing-section-" + tag.entity._links.self.href}>
                       <h1 key={"customer-landing-h1-" + tag.entity._links.self.href}>{tag.entity.name}</h1>
                       <button key={"customer-landing-h5-" + tag.entity._links.self.href} className="badge-rounded">
                           {"View " + tag.entity.name + "s"}
                       </button>
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
        this.props.history.push('/customer');
    }

    render() {
            return (
                <div>
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
                                          onNavigate={this.props.onNavigate}
                                          onDelete={this.props.onDelete}
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




