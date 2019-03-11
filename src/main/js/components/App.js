'use strict';

import React from "react";
const root = "/api";

import {Route, NavLink, Switch} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import {Login} from "./Login";
import {Customer} from "./Customer";
import {Manager} from "./Manager";
import {Staff} from "./Staff";

// import "../../resources/static/css/style.css";
import "../../resources/static/css/route-transition.css";
import follow from "../follow";
import client from "../client";
import when from "when";
// import "https://use.fontawesome.com/releases/v5.7.2/css/all.css";

/*
* This file is the React JS equivalent of Java's 'main' method, and
* is the entry point of the application.
*
* Note to everyone on the team - the majority of the components
* displayed below are unlikely to stay within this file, these are simply
* here to act as a proof of concept for the rest of the team and serve
* as reference for future code additions.
* */

export class App extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            diningSessions: [],
            diningSessionLinks: {},
            diningSessionAttributes: [],
            menuItems: [],
            menuItemLinks: {},
            menuItemAttributes: [],
            orders: [],
            orderLinks: {},
            orderAttributes: [],
            tags: [],
            tagLinks: {},
            tagAttributes: [],
            pageSize: 10
        };
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.updatePageSize = this.updatePageSize.bind(this);
        this.loadResourceFromServer = this.loadResourceFromServer.bind(this);
    }

    loadResourceFromServer(resource, pageSize){
        follow(client, root, [
            {rel: resource, params: {size: pageSize}}]
        ).then(resourceCollection => {
            return client({
                method: 'GET',
                path: resourceCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(resourceSchema => {
                switch(resource){
                    case('diningSessions'):
                        this.diningSessionSchema = resourceSchema.entity;
                        this.diningSessionLinks = resourceCollection.entity._links;
                        break;
                    case('menuItems'):
                        this.menuItemSchema = resourceSchema.entity;
                        this.menuItemLinks = resourceCollection.entity._links;
                        break;
                    case('orders'):
                        this.orderSchema = resourceSchema.entity;
                        this.orderLinks = resourceCollection.entity._links;
                        break;
                    case('tags'):
                        this.tagSchema = resourceSchema.entity;
                        this.tagLinks = resourceCollection.entity._links;
                        break;
                }
                return resourceCollection;
            });
        }).then(resourceCollection => {
            switch(resource){
                case('diningSessions'):
                    return resourceCollection.entity._embedded.diningSessions.map(diningSession =>
                        client({
                            method: 'GET',
                            path: diningSession._links.self.href
                        })
                    );
                case('menuItems'):
                    return resourceCollection.entity._embedded.menuItems.map(menuItem =>
                        client({
                            method: 'GET',
                            path: menuItem._links.self.href
                        })
                    );
                case('orders'):
                    return resourceCollection.entity._embedded.orders.map(order =>
                        client({
                            method: 'GET',
                            path: order._links.self.href
                        })
                    );
                case('tags'):
                    return resourceCollection.entity._embedded.tags.map(tag =>
                        client({
                            method: 'GET',
                            path: tag._links.self.href
                        })
                    );
            }
        }).then(resourcePromises => {
            return when.all(resourcePromises);
        }).done(resources => {
            switch(resource) {
                case('diningSessions'):
                    this.setState({
                        diningSessions: resources,
                        diningSessionAttributes: Object.keys(this.diningSessionSchema.properties),
                        pageSize: pageSize,
                        diningSessionLinks: this.diningSessionLinks
                    });
                    break;
                case('menuItems'):
                    this.setState({
                        menuItems: resources,
                        menuItemAttributes: Object.keys(this.menuItemSchema.properties).filter(attribute => attribute !== 'tags' && attribute !== 'orders'),
                        pageSize: pageSize,
                        menuItemLinks: this.menuItemLinks
                    });
                    break;
                case('tags'):
                    this.setState({
                        tags: resources,
                        tagAttributes: Object.keys(this.tagSchema.properties).filter(attribute => attribute !== 'menuItems'),
                        pageSize: pageSize,
                        tagLinks: this.tagLinks
                    });
                    break;
                case('orders'):
                    this.setState({
                        orders: resources,
                        orderAttributes: Object.keys(this.orderSchema.properties),
                        pageSize: pageSize,
                        orderLinks: this.orderLinks
                    });
                    break;
            }
        });
    }

    onDelete(deletedResource, resourceType) {
        client({method: 'DELETE', path: deletedResource.entity._links.self.href}).done(() => {
            switch(resourceType){
                case('diningSessions'):
                    this.loadResourceFromServer('diningSessions', this.state.pageSize);
                    break;
                case('menuItems'):
                    this.loadResourceFromServer('menuItems', this.state.pageSize);
                    break;
                case('orders'):
                    this.loadResourceFromServer('orders', this.state.pageSize);
                    break;
                case('tags'):
                    this.loadResourceFromServer('tags', this.state.pageSize);
                    break;
            }
        });
    }

    onCreate(newResource, resourceType) {
        follow(client, root, [resourceType]).then(response => {
            return client({
                method: 'POST',
                path: response.entity._links.self.href,
                entity: newResource,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(() => {
            return follow(client, root, [
                {rel: resourceType, params: {'size': this.state.pageSize}}]);
        }).done(response => {
            if (typeof response.entity._links.last !== "undefined") {
                this.onNavigate(response.entity._links.last.href, resourceType);
            } else {
                this.onNavigate(response.entity._links.self.href, resourceType);
            }
        });
    }

    onUpdate(resource, updatedResource, resourceType) {
        client({ //TODO: can switch to POST & MenuITemCollection
            method: 'PUT',
            path: resource.entity._links.self.href,
            entity: updatedResource,
            headers: {
                'Content-Type': 'application/json'
                // 'If-Match': menuItem.headers.Etag
            }
        }).done(() => {
            this.loadResourceFromServer(resourceType, this.state.pageSize);
        }, response => {
            if (response.status.code === 412) {
                alert('DENIED: Unable to update ' +
                    resource.entity._links.self.href + '. Your copy is stale.');
            }
        });
    }

    onNavigate(navUri, resourceType) {
        client({method: 'GET', path: navUri
        }).then(resourceCollection => {
            switch(resourceType){
                case('diningSessions'):
                    this.diningSessionLinks = resourceCollection.entity._links;
                    return resourceCollection.entity._embedded.diningSessions.map(diningSession =>
                        client({
                            method: 'GET',
                            path: diningSession._links.self.href
                        })
                    );
                case('menuItems'):
                    this.menuItemLinks = resourceCollection.entity._links;
                    return resourceCollection.entity._embedded.menuItems.map(menuItem =>
                        client({
                            method: 'GET',
                            path: menuItem._links.self.href
                        })
                    );
                case('orders'):
                    this.orderLinks = resourceCollection.entity._links;
                    return resourceCollection.entity._embedded.orders.map(order =>
                        client({
                            method: 'GET',
                            path: order._links.self.href
                        })
                    );
                case('tags'):
                    this.tagLinks = resourceCollection.entity._links;
                    return resourceCollection.entity._embedded.tags.map(tag =>
                        client({
                            method: 'GET',
                            path: tag._links.self.href
                        })
                    );
            }
        }).then(resourcePromises => {
            return when.all(resourcePromises);
        }).done(resources => {
            switch(resourceType){
                case('diningSessions'):
                    this.setState({
                        diningSessions: resources,
                        diningSessionAttributes: Object.keys(this.diningSessionSchema.properties),
                        pageSize: this.state.pageSize,
                        diningSessionLinks: this.diningSessionLinks
                    });
                    break;
                case('menuItems'):
                    this.setState({
                        menuItems: resources,
                        menuItemAttributes: Object.keys(this.menuItemSchema.properties).filter(attribute => attribute !== 'tags' && attribute !== 'orders'),
                        pageSize: this.state.pageSize,
                        menuItemLinks: this.menuItemLinks
                    });
                    break;
                case('orders'):
                    this.setState({
                        orders: resources,
                        orderAttributes: Object.keys(this.orderSchema.properties),
                        pageSize: this.state.pageSize,
                        orderLinks: this.orderLinks
                    });
                    break;
                case('tags'):
                    this.setState({
                        tagItems: resources,
                        tagAttributes: Object.keys(this.tagSchema.properties).filter(attribute => attribute !== 'menuItems'),
                        pageSize: this.state.pageSize,
                        tagLinks: this.tagLinks
                    });
                    break;
            }
        });
    }

    updatePageSize(pageSize, resourceType) {
        if (pageSize !== this.state.pageSize) {
            this.loadResourceFromServer(resourceType, pageSize);
        }
    }

    render() {
        return (
            <div className="App">
                <div className="nav">
                    <NavLink exact to="/login">Login</NavLink>
                    <NavLink to="/staff">Staff</NavLink>
                    <NavLink to="/manager">Manager</NavLink>
                    <NavLink to="/customer">Customer</NavLink>
                </div>

                <Route render={({location}) => (
                    <TransitionGroup>
                        <CSSTransition key={location.pathname} timeout={30000} classNames="fade" >
                            <Switch location={location}>
                                <Route exact path={"/login"} component={Login}/>
                                <Route path={"/customer"} render={(props) => (<Customer loadResourceFromServer={this.loadResourceFromServer}
                                                                                  onCreate={this.onCreate}
                                                                                  onUpdate={this.onUpdate}
                                                                                  onDelete={this.onDelete}
                                                                                  onNavigate={this.onNavigate}
                                                                                  diningSessions={this.state.diningSessions}
                                                                                  diningSessionLinks={this.state.diningSessionLinks}
                                                                                  diningSessionAttributes={this.state.diningSessionAttributes}
                                                                                  orders={this.state.orders}
                                                                                  orderLinks={this.state.orderLinks}
                                                                                  orderAttributes={this.state.orderAttributes}
                                                                                  selectedView={'Staff'}
                                                                                  {...props}/>)}/>
                                <Route path={"/manager"} render={(props) => (<Manager loadResourceFromServer={this.loadResourceFromServer}
                                                                                  onCreate={this.onCreate}
                                                                                  onUpdate={this.onUpdate}
                                                                                  onDelete={this.onDelete}
                                                                                  onNavigate={this.onNavigate}
                                                                                  menuItems={this.state.menuItems}
                                                                                  menuItemLinks={this.state.menuItemLinks}
                                                                                  menuItemAttributes={this.state.menuItemAttributes}
                                                                                  tags={this.state.tags}
                                                                                  tagLinks={this.state.tagLinks}
                                                                                  tagAttributes={this.state.tagAttributes}
                                                                                  selectedView={'Manager'}
                                                                                  {...props}/>)}/>
                                <Route path={"/staff"} render={(props) => (<Staff loadResourceFromServer={this.loadResourceFromServer}
                                                                                  onCreate={this.onCreate}
                                                                                  onUpdate={this.onUpdate}
                                                                                  onDelete={this.onDelete}
                                                                                  onNavigate={this.onNavigate}
                                                                                  diningSessions={this.state.diningSessions}
                                                                                  diningSessionLinks={this.state.diningSessionLinks}
                                                                                  diningSessionAttributes={this.state.diningSessionAttributes}
                                                                                  orders={this.state.orders}
                                                                                  orderLinks={this.state.orderLinks}
                                                                                  orderAttributes={this.state.orderAttributes}
                                                                                  selectedView={'Staff'}
                                                                                  {...props}/>)}/>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )}/>
            </div>
        )
    }
}