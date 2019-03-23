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

}

export class StaffDiningSession extends React.Component{

    render(){
        return (
        // <div>
        //     <div className="text">Table {this.props.diningSession.entity.tableNumber}</div>
        //     <div className="text">{this.props.diningSession.entity.price}</div>
        // </div>
            <div className="gridViewItem">               
                    <img className="itemImage" draggable="false" src="./asset/3.jpg" />               
                    <div className="overlay">
                        <div className="text">Table {this.props.diningSession.entity.tableNumber}</div>
                        <div className="text">{this.props.diningSession.entity.price}</div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className="view-detail-button" title="View details">
                            <i className="view-order" style={{fontSize: '20px'}} >View</i>
                        </button>
                        </div>
                    </div> 
            </div>
        )
    }

    handleClick(){
        //navigate to page
        // onclick={handleClick}
    }
}