'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import ReactDOM from "react-dom";

/** ----- COMPONENT IMPORTS -----**/
import {CustomerDiningSessionSelect} from "./subcomponents/DiningSession";

/** ----- CSS/STYLING IMPORTS -----**/
import "../../resources/static/css/select_table_num.css";

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
        this.state = {pageSize: 10, selectedView: 'Customer'}
    }

    componentDidMount(){
        this.props.loadResourceFromServer('menuItems', this.state.pageSize);
        this.props.loadResourceFromServer('diningSessions', this.state.pageSize);
    }

    render() {
        //TODO: note passing customerDS to the <customer tag, however diningSessionLinks/Attributes arent parsed
        const customerDS = this.props.filterDiningSessionList('ta_status');
        return (
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
        this.props.history.push('/CustomerLanding');
    }


    render() {
        //const unassigned = this.props.diningSessions.filter(session => session.entity.tableAssignmentStatus === "UNASSIGNED");
        //console.log("Unassigned is: \n"+unassigned);
        return (
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
        );
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

