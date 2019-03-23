'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";


export class CustomerDiningSessionSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    filterDiningSessionList(diningSession, option, string){
        let filteredList = [];
        switch(option){
            case 'ta_status':
                filteredList = this.state.diningSessions.filter(
                    session => session.entity.tableAssignmentStatus === "UNASSIGNED");
                break;
            case 'br_status':
                filteredList = this.state.diningSessions.filter(
                    session => session.entity.billRequestStatus === "ACTIVE");
                break;
            case 'sr_status':
                filteredList = this.state.diningSessions.filter(
                    session => session.entity.serviceRequestStatus === "ACTIVE");
                break;

            default: //invalid option for filtering return all
                console.log("ERROR: Invalid option for filterDiningSessionList returning default");
                filteredList = this.state.diningSessions;
        }

        return filteredList
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