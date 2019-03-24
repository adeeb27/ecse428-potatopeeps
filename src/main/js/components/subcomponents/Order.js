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
import { StaffOrders } from "../Staff";
import "../../../resources/static/css/staff.css"

//export the vanilla list
export class OrderList extends React.Component {

    constructor(props){
        super(props);
    }

    //need to return a version corresponding to view(Manager, Customer, etc)
    //references OrderItem
    render(){
         if(this.props.selectedView === 'Staff'){
             return (
                 <StaffOrderList
                    orders={this.props.orders}
                    pageSize={this.props.pageSize}
                    attributes={this.props.attributes}
                    orderLinks={this.props.menuItemLinks}
                    onNavigate={this.props.onNavigate}
                    updatePageSize={this.props.updatePageSize}
                    onUpdate={this.props.onUpdate}
                    onDelete={this.props.onDelete}/>);
         }
    }
}

export class DiningSessionOrders extends React.Component{
    constructor(props){
        super(props);       //assume the following props are passed in: diningSession
        this.state = {
            orders : [],
        }
        this.requestOrders = this.requestOrders.bind(this);
    }

    render(){
        // const orders = 
        // this.requestOrders();
        console.log("DiningSession orders page");
        console.log(this.props.diningSession);
        console.log("All props");
        console.log(this.props);
        return (
            // <div>test garbage</div>
            <div className="blahblah">
                <StaffOrderList
                    orders={this.state.orders}
                />
            </div>
            
        );
    }

    requestOrders(){
        // this.props.location.state.diningSession.entity._links.orders.href
        console.log(this.props.location.diningSession);
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

//    filterOrderList(sessionId){
//         let filteredList = [];
//         this.state.orders.filterorder( order => order.entity.s === tableNumber());
//         filteredList = this.state.diningSessions;
//         this.setState({
//             status: this.state.status,
//             quantity: this.props.order.quantity,
//             orders: filteredList
//         })
//     }

    // componentDidMount(){
    //     requestOrders();
    // }
}
class StaffOrderList extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        //TODO need to filter orders by DiningSession
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log(this.props);
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
class Order extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: this.props.order.status,
            quantity: this.props.order.quantity,
            menuItem: {}
        };
    }
}

export class StaffOrder extends Order{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <tr>
                <th scope="row">
                    <img className="item-preview" src="./asset/4.jpg"/>>
                </th>
                <td>{this.state.menuItem.name}</td>
                <td>{this.props.price}</td>
                <td>
                    <div className="number-input">
                        <input className="quantity" min="0" name="quantity" value={this.state.quantity} type="number" disabled/>>
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
        this.setState(
            {
                status: event.target.value,
                menuItem: this.state.menuItem,
                quantity: this.props.order.quantity
            }
        )
    }
    
}