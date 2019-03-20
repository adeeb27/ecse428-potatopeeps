'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";


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