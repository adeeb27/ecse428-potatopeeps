/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faDollarSign, faUser, faBell} from "@fortawesome/free-solid-svg-icons";

/** ----- COMPONENT IMPORTS -----**/

/** ----- CSS/STYLING IMPORTS -----**/
import "../../resources/static/css/staff.css";

/**
 * This JS file contains all code related to the rendering of the 'Staff' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

export class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedView: 'Staff'};
    }

    componentDidMount() {
        this.props.loadResourceFromServer('diningSessions', this.state.pageSize)
    }

    render() {
        return (
            <div className={"page staff-page"}>
                <StaffLanding history={this.props.history}
                              orders={this.props.orders}
                              onUpdate={this.props.onUpdate}
                              orderAttributes={this.props.orderAttributes}
                              diningSessions={this.props.diningSessions}
                              diningSessionsAttributes={this.props.diningSessionAttributes}
                              selectedView={this.props.selectedView}/>
            </div>
        )
    }
}

class StaffLanding extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOrders = this.handleClickOrders.bind(this);
        this.handleClickRequests = this.handleClickRequests.bind(this);
    }

    // Method called when attempting to navigate to the 'Staff Requests' page
    handleClickRequests(e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/staff-requests',
            state: {onUpdate: this.props.onUpdate,
                    diningSessions: this.props.diningSessions,
                    diningSessionAttributes: this.props.diningSessionAttributes,
                    selectedView: this.props.selectedView}
        })
    }

    // Method called when attempting to navigate to the 'Staff Orders' page
    handleClickOrders(e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/staff-orders',
            state: {onUpdate: this.props.onUpdate,
                    orders: this.props.orders,
                    orderAttributes: this.props.orderAttributes,
                    selectedView: this.props.selectedView}
        })
    }

    render() {
        return (
            <div>
                <title>Staff Landing Page</title>
                <div id="staff-wrapper">
                    <header className="staff-frontpage">
                        <a href="#" className="staff-logo">
                            <img src="./img/logo.png" alt="Home"/>
                        </a>
                    </header>
                </div>
                <div className="staff-navigation">
                    <div className="staff-overlay">
                        <div className="staff-nav-btn-wrapper">
                            <button className="staff-nav-btn" onClick={this.handleClickRequests}>All Requests</button>
                        </div>
                        <div className="staff-nav-btn-wrapper">
                            <button className="staff-nav-btn" onClick={this.handleClickOrders}>All Orders</button>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}


/**
 * This component should contain the 'page' for the staff member to view all the current customer requests,
 * either bill or service requests.
 *
 * See 'Customer-Menu' component in Customer.js for an example of how to navigate to this page and connect it
 * to the Staff component above.
 */
export class StaffRequests extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
    }

    handleCloseMenu(){
        this.props.history.push({
            pathname: '/staff'
        });
    }

    render() {
        return (
            <div>
                <div id="wrapper">
                    <main className="main-wrapper">
                        <header className="detail full">
                            <a className="back" onClick={this.handleCloseMenu} data-transition="slide-from-top" />
                            <section>
                                <h1 className="category-title">Requests</h1>
                                <h3 className="page-badge">Bill and more</h3>
                            </section>
                        </header>
                        <div className="content-wrap full-width">
                            <div className="gridViewContainer">
                                <div className="gridViewItem">
                                    <img className="itemImage" draggable="false" src="./img/4.jpg" />
                                    <div className="overlay billReq">
                                        <div className="text">Table 23</div>
                                        <div className="text">Bill Request</div>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <button title="View Detail" className="view-detail-button">
                                                <i className="view-order" style={{fontSize: '20px'}}>View Detail</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="gridViewItem">
                                    <img className="itemImage" draggable="false" src="./img/3.jpg" />
                                    <div className="overlay serviceReq">
                                        <div className="text">Table 15</div>
                                        <div className="text">Service Request</div>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <button title="Answer" className="view-detail-button">
                                                <i className="view-order" style={{fontSize: '20px'}}>Answer</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="gridViewItem">
                                    <img className="itemImage" draggable="false" src="./img/2.jpg" />
                                    <div className="overlay answeringReq">
                                        <div className="text">Table 23</div>
                                        <div className="text">Service Request</div>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <button title="Clear request" className="view-detail-button">
                                                <i className="view-order" style={{fontSize: '20px'}}>OK</i>
                                            </button>
                                        </div>
                                        <div className="answerStatus">***Answering***</div>
                                    </div>
                                </div>
                                <div className="gridViewItem">
                                    <img className="itemImage" draggable="false" src="./img/5.jpg" />
                                    <div className="overlay billReq">
                                        <div className="text">Table 23</div>
                                        <div className="text">Bill Request</div>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <button title="View Detail" className="view-detail-button">
                                                <i className="view-order" style={{fontSize: '20px'}}>View Detail</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="gridViewItem">
                                    <img className="itemImage" draggable="false" src="./img/6.jpg" />
                                    <div className="overlay billReq">
                                        <div className="text">Table 23</div>
                                        <div className="text">Bill Request</div>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <button title="View Detail" className="view-detail-button">
                                                <i className="view-order" style={{fontSize: '20px'}}>View Detail</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="gridViewItem">
                                    <img className="itemImage" draggable="false" src="./img/4.jpg" />
                                    <div className="overlay billReq">
                                        <div className="text">Table 23</div>
                                        <div className="text">Bill Request</div>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <button title="View Detail" className="view-detail-button">
                                                <i className="view-order" style={{fontSize: '20px'}}>View Detail</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="gridViewItem">
                                    <img className="itemImage" draggable="false" src="./img/2.jpg" />
                                    <div className="overlay billReq">
                                        <div className="text">Table 23</div>
                                        <div className="text">Bill Request</div>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <button title="View Detail" className="view-detail-button">
                                                <i className="view-order" style={{fontSize: '20px'}}>View Detail</i>
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
                <a href="#" id="back-to-top">
                    <i className="icon staff-bg staff-icon-UpArrow" />
                </a>
            </div>
    );
    }
}


/**
 * This component should contain the 'page' for the staff member to view all the current orders,
 * generated by customers.
 */
export class StaffOrders extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

            </div>
        );
    }

}