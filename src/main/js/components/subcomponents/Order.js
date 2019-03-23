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
    }

    componentDidMount() {
        //TEST: this.requestMenuItem("http://localhost:8080/api/menuItems/1");
        var list = [
            1,
            [
                ["http://localhost:8080/api/menuItems/1", 3]
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
        console.log("IN ORDER SUBMIT METHOD");
        var tableNum = list[0];
        var menuItems = list[1];

        var diningSessionUrl = "http://localhost:8080/api/diningSessions/1"; // TO-DO get the correct one based on tableNum

        for (var i = 0, length = menuItems.length; i < length; i++) {
            const newOrder = {};
            var menuItemUrl = menuItems[i][0];
            var quantity = menuItems[i][1];
            console.log(menuItemUrl);
            this.requestMenuItem(menuItemUrl);

            console.log(this.state.menuItem);
            newOrder['price'] = newOrder['[price'] + this.state.menuItem.price;
            newOrder['status'] = 'ORDERED';
            newOrder['quantity'] = quantity;
            newOrder['menuItem'] = menuItemUrl;
            newOrder['diningSession'] = diningSessionUrl;

            // Create the order in DB
            //this.props.onCreate(newOrder, "orders");
        }
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

                    response.json().then((data) => {
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
        return null;
    }
}