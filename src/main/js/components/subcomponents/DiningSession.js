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
    }

    render(){
        const sessions = this.props.diningSessions.map(session =>
            <StaffDiningSession
                key={session.entity._links.self.href}
                diningSession={session}
                diningSessionAttributes={this.props.diningSessionAttributes}
                history = {this.props.history}
            />

        )

        //TODO review how to get number of diningSessions. Test whether this.props.diningSessions.size returns a number or undefined
        //TODO refactor the gridViewContainer into a DiningSessionList component
        return  (
            <div>
                <title>All Orders</title>
                <p>bananafofana {sessions.size} test</p>
                
                {sessions}
            </div>
        )
    }

//     requestOrders(){
//         fetch(this.props.entity._links.tags.href, {method: 'GET', headers: {'Content-Type': 'application/json'}})
//            .then(
//                response => {
//                    if (!response.ok) {
//                        console.log('Looks like there was a problem. Status Code: ' +
//                            response.status);
//                        return;
//                    }

//                    // Examine the text in the response
//                    response.json().then((data) => {
//                        console.log(data._embedded.tags);
//                        this.setState(
//                            {
//                                 status: this.state.status,
//                                 quantity: this.props.order.quantity,
//                                 menuItem: data._embedded.menuItems
//                             }
//                         );
//                    });
//                }
//            )
//            .catch(function(err) {
//                console.log('Fetch Error :-S', err);
//            });
//    }

}

export class StaffDiningSession extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
    }
    render(){
        return (
            <div className="gridViewItem">               
                    <img className="itemImage" draggable="false" src="./asset/3.jpg" />               
                    <div className="overlay">
                        <div className="text">Table {this.props.diningSession.entity.tableNumber}</div>
                        <div className="text">{this.props.diningSession.entity.price}</div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className="view-detail-button" title="View details">
                            <i className="view-order" style={{fontSize: '20px'}} onClick={this.handleClick}>View</i>
                        </button>
                        </div>
                    </div> 
            </div>
        )
    }

    handleClick(){
        //TODO navigate to specific orders for diningSessions
        // onclick={handleClick}
        console.log("in handle click");
        
        this.handleCloseMenu();
        console.log("after handleClose");
    }

    handleCloseMenu(){
        console.log("in handleClose");
        this.props.history.push('/tables');
        //     {
        //     pathname: ('/tables/')} // + this.props.diningSession.entity.tableNumber
        //     // state: {diningSession : this.props.diningSession} //TODO: make use of tableNum via this.props.location.state.tableNum
        //     // }
        // );
        console.log("after history push");
    }
}