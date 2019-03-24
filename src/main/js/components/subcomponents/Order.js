'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import ReactDOM from "react-dom";

export class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {menuItem: [], diningSession: []}; // current menu item and dining session being considered in submitOrdersToDB
        this.submitOrdersToDB = this.submitOrdersToDB.bind(this);
        this.requestMenuItem = this.requestMenuItem.bind(this);
        this.requestDiningSession = this.requestDiningSession.bind(this);
        this.testSubmit = this.testSubmit.bind(this);
    }

    componentDidMount() {
        this.props.loadResourceFromServer('orders', 20);
        this.props.loadResourceFromServer('diningSessions', 20);
    }

    /**
     * Used for testing only (can delete after verify that submitOrdersToDB works)
     * @param e
     */
    testSubmit(e) {
        e.preventDefault();
        // FOR TESTING
        var list = [
            2,
            [
                ["http://localhost:8080/api/menuItems/2", 5],
                ["http://localhost:8080/api/menuItems/1", 3],
                ["http://localhost:8080/api/menuItems/5", 1]
            ]
        ];
        this.submitOrdersToDB(list);
    }

    /**
     * Create orders in DB, and link them to appropriate menu item and dining session
     * @param list: array containing (tableNum, menuItems)
     * menuItems is a 2d array containing the pairs (menuItem URL, quantity)
     */
    submitOrdersToDB(list) {
        // Wait 1 second before submitting to allow resources to load in componentDidMount
        setTimeout( () => {
            console.log("IN ORDER SUBMIT METHOD");
            var tableNum = list[0];
            var menuItems = list[1];

            // Find the correct dining session href
            var diningSessionUrl = "";
            var diningSessions = this.props.diningSessions;
            for (var j = 0, length = diningSessions.length; j < length; j++) {
                if (diningSessions[j].entity.tableNumber === tableNum) {
                    console.log("FOUND IT: " + diningSessions[j].entity._links.self.href)
                    diningSessionUrl = diningSessions[j].entity._links.self.href;
                }
            }

            for (var i = 0, length = menuItems.length; i < length; i++) {
                let newOrder = {};
                var menuItemUrl = menuItems[i][0];
                var quantity = menuItems[i][1];

                console.log(newOrder);
                this.requestMenuItem(menuItemUrl);
                console.log(menuItemUrl);

                // Wait 1 second so that the menu item is loaded into state.menuItem
                setTimeout( () => {
                    console.log(this.state.menuItem);

                    newOrder['price'] = parseInt(quantity, 10) * parseInt(this.state.menuItem.price,10);
                    newOrder['status'] = 'ORDERED';
                    newOrder['quantity'] = quantity;
                    newOrder['menuItem'] = menuItemUrl;
                    newOrder['diningSession'] = diningSessionUrl;

                    console.log(newOrder);
                    // Create the order in DB
                    this.props.onCreate(newOrder, "orders");
                    console.log(newOrder);
                }, 1000);
            }
        }, 1000);
    }

    /**
     * Set state.menuItem to the MenuItem corresponding to the passed href
     * @param menuItemUrl: href to a MenuItem
     */
    requestMenuItem(menuItemUrl) {
        fetch(menuItemUrl, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(
                response => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                    }
["http://localhost:8080/api/menuItems/2", 5]
                    response.json().then((data) => {
                        console.log("DATA");
                        console.log(data);
                        this.setState({menuItem: data});
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    /**
     * Set state.diningSession to the diningSession corresponding to the passed href
     * @param diningSessionUrl: href to a DiningSession
     */
    requestDiningSession(diningSessionUrl) {
        fetch(diningSessionUrl, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(
                response => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                    }

                    response.json().then((data) => {
                        this.setState({diningSession: data});
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    /**
     * Dont need to render anything
     * @returns {null}
     */
    render() {
        return (
            <div>
                <button type="button" onClick={this.testSubmit}>Test</button>
            </div>
        )
        //return null;
    }
}