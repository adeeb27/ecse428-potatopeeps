'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
/**Custom Class imports */
import { StaffOrders } from "../Staff";
/** Styling Imports */
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash, faEdit, faAngleDoubleLeft,
    faAngleDoubleRight, faAngleLeft, faAngleRight,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import "../../../resources/static/css/staff.css"

//*******************  IMPORTANT*****
//Due to an unknown caveat of React.js, the unmounting of this component does not occur for multiple seconds
//This will therefore cause the end-user to load stale information if the user does not wait long enough in between 
    //selecting a diningSession's orders to view.
//It is recommended that the end user, and testers wait 20 seconds after navigating backwards from a diningSessionOrders page before selecting another
//******/
//The DiningSessionOrders class is routed to from a list of all diningSession.
//This component corresponds to a list of Orders associated with a diningSession
//The hierarchy of Order expression goes as: StaffDiningSession -routes-> DiningSessionOrders -contains-> StaffOrderList -contains-> StaffOrder
export class DiningSessionOrders extends React.Component{
    constructor(props){
        super(props);       //assume the following props are passed in: diningSession
        this.state = {
            orders : [],
        }
        this.requestOrders = this.requestOrders.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    render(){
        return (
            <div id="wrapper">
                <main className="main-wrapper">
                    <header className="detail full">
                        <div onClick={this.handleBackClick} className="back" data-transition="slide-from-top"></div>

                        <section>
                            <h1 className="category-title">Order Details for {this.props.location.state.diningSession.table}</h1> 
                        </section>
                    </header>

                    <div className="content-wrap full-width">
                        <StaffOrderList
                            orders={this.state.orders}
                        />
                    </div>
                    <div className="button-container orderDetail">
                        <button className="cart-help-button">
                            <i className="fas fa-sync-alt" style={{fontSize: '20px'}}>    Update Cart</i>
                        </button>

                        <span className="cart-total name">Cart Totals: </span>
                        <span className="cart-total amount">{this.props.location.state.diningSession.price}</span>
                    </div>
                    <footer>
                        <div className="signature">
                            <h6>Sushi</h6>
                            <h5>PotatoPeeps</h5>
                        </div>
                    </footer>    			
                </main>
                
            </div>
        );
    }

    //this method dynamically loads the orders associated with the given
    //diningSession and converts them into renderable components, namely StaffOrderList and StaffOrder
    requestOrders(){
        fetch(this.props.location.diningSession.entity._links.orders.href, {method: 'GET', headers: {'Content-Type': 'application/json'}})
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
                        console.log("In the render of Orders");
                        console.log(this.state);
                        console.log("in render");
                   });
               }
           )
           .catch(function(err) {
               console.log('Fetch Error :-S', err);
           });
   }
   componentDidMount(){
        this.requestOrders();
   }

   componentWillUnmount(){
       console.log("UNMOUNTING UNMOUNTING UNMOUNTING UNMOUNTING UNMOUNTING")
   }

   handleBackClick(){
    this.props.history.goBack();
   }
}

class StaffOrderList extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        const orders = this.props.orders.map(order =>
            <StaffOrder 
                key={order._links.self.href}
                order={order}
                orderAttributes={this.props.orderAttributes}
                onUpdate={this.props.onUpdate}
                //TODO does Staff have authority to delete order?

            />
        )

        return (
                <div className="table-container">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Item</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders}
                        </tbody>
                    </table>
                </div>
        );
    }

}

export class StaffOrder extends Order{
    constructor(props){
        super(props);
        this.state = {
            status: this.props.order.status,
            quantity: this.props.order.quantity,
            menuItem: {}
        };
    }

    render(){
        return (
            <tr>
                <th scope="row">
                    <img className="item-preview" src="../../../resources/static/img/4.jpg"/>>
                </th>
                <td>{this.state.menuItem.name}</td>
                <td>{this.props.price}</td>
                <td>
                    <div className="number-input">
                        <input readOnly className="quantity" min="0" name="quantity" value={this.state.quantity} type="number" disabled/>>
                    </div>
                </td>
                <td>{this.state.props}</td>
                <td>
                    <select id="soflow" value={this.state.status}>
                        <option>Ordered</option>
                        <option>In Progress</option>
                        <option>Ready</option>
                        <option>Served</option>
                    </select>
                </td>
            </tr>
        );
    }

    handleSelectChange(event){
        //TODO Matt's update code will probably go here.
        this.setState(
            {
                status: event.target.value,
                menuItem: this.state.menuItem,
                quantity: this.props.order.quantity
            }
            
        )
    }
    
}