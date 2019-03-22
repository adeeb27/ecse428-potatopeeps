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

class StaffDiningSection{

    render(){

        <div className="gridViewItem">               
                  <img className="itemImage" draggable="false" src="./asset/3.jpg" />               
                  <div className="overlay">
                    <div className="text">Table {this.props.diningSession.entity.tableNumber}</div>
                    <div className="text">{this.props.diningSession.entity.price}</div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <button className="view-detail-button" title="View details">
                        <i className="view-order" style={{fontSize: '20px'}} onclick={handleClick}>View</i>
                      </button>
                    </div>
                  </div> 
        </div>
    }

    handleClick(){
        //navigate to page
    }
}