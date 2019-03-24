'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash, faEdit, faAngleDoubleLeft,
    faAngleDoubleRight, faAngleLeft, faAngleRight,
    faPlus
} from "@fortawesome/free-solid-svg-icons";

/** ----- CSS/STYLING IMPORTS -----**/
import "../../../resources/static/css/staff.css"
//TODO filter for active
export class CustomerDiningSessionSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const options = this.props.diningSessions.map(diningSession =>
            <option key={"option-dining-session-" + diningSession.entity._links.self.href} value={diningSession.entity.tableNumber}>
                {"Table No. " + diningSession.entity.tableNumber}
            </option>

        );

        return(
            <select id="table-select-dropdown" className="tableID-stn">
                {options}
            </select>
        );
    }
}

export class StaffDiningSessionPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            show : false,
            orders : []
        }
    }

    render(){
        const sessions = this.props.diningSessions.map(session =>
            <StaffDiningSession
                key={session.entity._links.self.href}
                diningSession={session}
                diningSessionAttributes={this.props.diningSessionAttributes}
                history = {this.props.history}
            />)

        //TODO review how to get number of diningSessions. Test whether this.props.diningSessions.size returns a number or undefined
        return  (
            <div>
                <title>All Orders</title>
                {sessions}
                
            </div>
        )
    }

    handleClose(){
        //load orders
        // const orders;
    }

}

export class StaffDiningSession extends React.Component{

    constructor(props){
        super(props);
        this.handleListOrders = this.handleListOrders.bind(this);
    }

    requestOrders(){
        fetch(this.props.diningSession.entity._links.orders.href, {method: 'GET', headers: {'Content-Type': 'application/json'}})
            .then(
                response => {
                    if (!response.ok) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then((data) => {
                        console.log(data._embedded.orders);
                        this.setState(
                            {
                                orders : data._embedded.orders
                            }
                        );
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
   }
    render(){
        console.log("Individual session:");
        console.log(this.props.diningSession);
        return (
            <div className="gridViewItem">               
                    <img className="itemImage" draggable="false" src="./img/3.jpg" />               
                    <div className="overlay">
                        <div className="text">Table {this.props.diningSession.entity.tableNumber}</div>
                        <div className="text">{this.props.diningSession.entity.price}</div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button className="view-detail-button" title="View details">
                                <i className="view-order" style={{fontSize: '20px'}} onClick={this.handleListOrders}>View</i>
                            </button>
                        </div>
                        
                    </div> 
            </div>
        )
    }

    handleListOrders(){
        this.props.history.push
        (
            {
            pathname: ('/orders/'),
            state: {diningSession : this.props.diningSession},
            diningSession : this.props.diningSession
            } 
        );
        
    }
}