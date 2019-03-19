'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react"; // Imports the ReactJS Library; Link: https://reactjs.org/
import {Route, NavLink, Switch} from "react-router-dom"; // Imports the React-Router Elements mentioned in Index.js
import {CSSTransition, TransitionGroup} from "react-transition-group";
const root = "/api"; // Root is a variable used to provide pathing to the uriListConverter

/** ----- COMPONENT IMPORTS -----**/
import {Login} from "./Login";
import {Staff} from "./Staff";
import {Manager} from "./Manager";
import {Customer, CustomerMenu} from "./Customer";

/** ----- TUTORIAL API IMPORTS -----**/
import follow from "../follow";
import client from "../client";
import when from "when";

/** ----- CSS/STYLING IMPORTS -----**/
// import "../../resources/static/css/style.css"; /** TEMPORARILY REMOVED PENDING REFACTORING BY UI TEAM. **/
import "../../resources/static/css/route-transition.css";

/**
* This file is the React JS equivalent of Java's 'main' method, and holds the majority of
 * our generic business logic (Creating, Updating, Deleting resources).
 *
 * The state of this Component contains and should contain virtually all of the information we intend on storing
 * about the application - this includes DiningSessions, MenuItems, Orders and Tags. Do note that if we decide to add
 * further database tables, we will have to update the methods below accordingly.
 *
 * This information is then passed or 'sent' to the components we have instantiated as Routes, specifically the
 * Customer.js, Manager.js, Staff.js. This *named* information sent to these components is subsequently
 * accessed in each via their props variable. See documentation below for further explanation.
 *
 * Link to ReactJS Documentation on State: https://reactjs.org/docs/state-and-lifecycle.html
 * Link to ReactJS Documentation on Components & Props: https://reactjs.org/docs/components-and-props.html
 *
 * @Author Evan Bruchet, Gabriel Negash
* */

let validResources = [];

export class App extends React.Component {

    /**
     * The constructor below instantiates each of the state variables mentioned previously. These variables are then
     * selectively sent to the components Customer, Manager, Staff. Note some of these variables are NOT passed to the
     * Route components as they don't require all these variables. (Manager does not need to see DiningSessions for ex.)
    * */
    constructor(props){
        super(props);
        this.state ={
            diningSessions: [],
            diningSessionLinks: {},
            diningSessionAttributes: [],
            menuItems: [],
            menuItemLinks: {},
            menuItemAttributes: [],
            menuItemTags: [],
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
        this.filterMenuItemList = this.filterMenuItemList.bind(this);
        this.loadResourceFromServer = this.loadResourceFromServer.bind(this);
    }


    /**
     * loadResourceFromServer - Initializes / updates the state variables mentioned above with the appropriate values.
     * Generally called upon loading of a page, or after Creating/Updating/Deleting a resource, so the View has an up
     * to date view of the database.
     *
     * @param resourceType - A string sent describing which of the resources the sub-component wishes to 'load'. Note
     * the possible values are 'diningSessions', 'menuItems', 'orders', 'tags' as these are how we currently reference
     * our database tables via URI.
     * @param pageSize - Simply denotes the number of entries to return.
     *
     * Link to ReactJS/Spring DATA REST Tutorial: https://spring.io/guides/tutorials/react-and-spring-data-rest/#react-and-spring-data-rest-part-2
     */
    loadResourceFromServer(resourceType, pageSize){
        follow(client, root, [
            {rel: resourceType, params: {size: pageSize}}]
        ).then(resourceCollection => {
            return client({
                method: 'GET',
                path: resourceCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(resourceSchema => {
                switch(resourceType){
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
            switch(resourceType){
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
            switch(resourceType) {
                case('diningSessions'):
                    this.setState({
                        diningSessions: resources,
                        diningSessionAttributes: Object.keys(this.diningSessionSchema.properties),
                        pageSize: pageSize,
                        diningSessionLinks: this.diningSessionLinks
                    });
                    break;
                case('menuItems'):
                    this.resourceTags = [];
                    this.setState({menuItemTags: []});
                    resources.forEach(resource => {
                        fetch(resource.entity._links.tags.href, {
                            method: 'GET',
                            headers: {'Content-Type': 'application/schema+json'}
                        })
                            .then(
                                response => {
                                    response.json().then((data) => {
                                        let menuItemTagsTemp = this.state.menuItemTags;
                                        let resourceTags = data._embedded.tags.map(tag => tag.name);
                                        let newMenuItemTag = {menuItem: resource, tags: resourceTags};

                                        Promise.resolve(newMenuItemTag).then(value => {
                                            if (menuItemTagsTemp.indexOf(value) === -1)
                                                menuItemTagsTemp.push(value);
                                            this.setState({menuItemTags: menuItemTagsTemp});
                                        });
                                    });
                                }
                            )
                            .catch(function (err) {
                                console.log('Fetch Error :-S', err);
                            });
                    });
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

    filterMenuItemList(selectedTags){
        let validMenuItems;
        if (selectedTags.length === 0) {
            this.setState({menuItems: []});
            this.loadResourceFromServer('menuItems', this.state.pageSize);
            return Promise.resolve(this.state.menuItemTags); //TODO: Return MenuItems not MenuItemTags
        } else{
            validMenuItems = this.state.menuItemTags
                .filter(menuItemTag => selectedTags
                    .every(e => menuItemTag.tags.map(tag => tag)
                        .includes(e))).map(menuItemTag => menuItemTag.menuItem);
            console.log("Valid Menu Items: ", validMenuItems);
            return Promise.resolve(validMenuItems)
                .then(validMenuItems => {
                    this.setState({menuItems: validMenuItems});
                    console.log("This State Menu Items: ", this.state.menuItems);
                    return validMenuItems;
                });
        }


    }

    /**
     * onCreate - Creates and inserts the passed resource into the database, then refreshes the state's view of the table.
     * @param newResource - A JS Object, describing the resource to be created.
     * @param resourceType - A string describing which of the resource tables the sub-component wishes to insert into.
     *
     * @author Ryan Dotsikas, Evan Bruchet
     */
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

    /**
     * onUpdate - Updates the passed resource in the database, assuming present - then refreshes state's view of the table.
     * @param resource - A JS Object, describing the resource to be updated.
     * @param updatedResource - The JS Object with new properties describing the resource to be updated.
     * @param resourceType - A string sent describing which of the resource tables the sub-component wishes to update
     * Note the possible values are 'diningSessions', 'menuItems', 'orders', 'tags' as these are our currently
     * existing database tables, and how they are referenced via URI.
     *
     * @author Gabriel Negash, Evan Bruchet
     */
    onUpdate(resource, updatedResource, resourceType) {
        client({
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

    /**
     * onDelete - Deletes the passed resource from the database, then refreshes the state's view of the table.
     *
     * @param deletedResource - A JS Object, describing the resource to be deleted.
     * @param resourceType - A string sent describing which of the resource tables the sub-component wishes to delete
     * from. Note the possible values are 'diningSessions', 'menuItems', 'orders', 'tags' as these are our currently
     * existing database tables, and how they are referenced via URI.
     *
     * @author Ryan Dotsikas, Evan Bruchet
     */
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

    /**
     * onNavigate - Called in the onCreate function to force a navigation to the final page of the table to see the
     * newly inserted resource.
     *
     * @param navUri - The URI upon which a GET Request is performed.
     * @param resourceType - A string sent describing which of the resource tables the sub-component wishes to navigate
     * to. Note the possible values are 'diningSessions', 'menuItems', 'orders', 'tags' as these are our currently
     * existing database tables, and how they are referenced via URI.
     *
     * @author Ryan Dotsikas, Evan Bruchet
     */
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



    /**
     * render - Render a React element into the DOM in the supplied container and return a reference to the component
     *
     * @returns The HTML/JSX code to be displayed by this element. In this case, we return a basic navbar at the top
     * to allow the development team to move between our existing pages easily using <NavLink> components.
     * NOTE: This navbar will be removed by the end of the project.
     *
     * Additionally, this is where we place all of our <Route> component, grouped together by a <Switch> component. This
     * <Switch> component iterates over all its children <Route> elements and renders the first one matching the current
     * URL. We have a Route for each of our 'pages' or views - Login, Customer, Manager and Staff.
     */
    render() {
        return (
            <div className="App">
                <div className="nav">
                    <NavLink exact to="/login">{"Login  "}</NavLink>
                    <NavLink to="/staff">{"Staff  "}</NavLink>
                    <NavLink to="/manager">{"Manager  "}</NavLink>
                    <NavLink to="/customer">{"Customer  "}</NavLink>
                </div>

                <Route render={({location}) => (
                    <TransitionGroup>
                        <CSSTransition key={location.pathname} timeout={30000} classNames="fade" >
                            <Switch location={location}>
                                <Route exact path={"/login"} component={Login}/>
                                <Route path={"/customer"} render={(props) =>
                                    (<Customer loadResourceFromServer={this.loadResourceFromServer}
                                                                      onCreate={this.onCreate}
                                                                      onUpdate={this.onUpdate}
                                                                      onDelete={this.onDelete}
                                                                      onNavigate={this.onNavigate}
                                                                      diningSessions={this.state.diningSessions}
                                                                      diningSessionLinks={this.state.diningSessionLinks}
                                                                      filterMenuItemList={this.filterMenuItemList}
                                                                      menuItems={this.state.menuItems}
                                                                      menuItemLinks={this.state.menuItemLinks}
                                                                      menuItemAttributes={this.state.menuItemAttributes}
                                                                      tags={this.state.tags}
                                                                      tagLinks={this.state.tagLinks}
                                                                      tagAttributes={this.state.tagAttributes}
                                                                      diningSessionAttributes={this.state.diningSessionAttributes}
                                                                      orders={this.state.orders}
                                                                      orderLinks={this.state.orderLinks}
                                                                      orderAttributes={this.state.orderAttributes}
                                                                      selectedView={'Customer'}
                                                                      {...props}/>)}/>
                                <Route path={"/manager"} render={(props) =>
                                    (<Manager loadResourceFromServer={this.loadResourceFromServer}
                                                                      onCreate={this.onCreate}
                                                                      onUpdate={this.onUpdate}
                                                                      onDelete={this.onDelete}
                                                                      onNavigate={this.onNavigate}
                                                                      filterMenuItemList={this.filterMenuItemList}
                                                                      menuItems={this.state.menuItems}
                                                                      menuItemLinks={this.state.menuItemLinks}
                                                                      menuItemAttributes={this.state.menuItemAttributes}
                                                                      tags={this.state.tags}
                                                                      tagLinks={this.state.tagLinks}
                                                                      tagAttributes={this.state.tagAttributes}
                                                                      selectedView={'Manager'}
                                                                      {...props}/>)}/>
                                <Route path={"/staff"} render={(props) =>
                                    (<Staff loadResourceFromServer={this.loadResourceFromServer}
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
                                <Route path={"/customer-menu"} render={(props) =>
                                    (<CustomerMenu loadResourceFromServer={this.loadResourceFromServer}
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
                                            menuItemTags={this.state.menuItemTags}
                                            selectedView={'Customer'}
                                            filterMenuItemList={this.filterMenuItemList}
                                            {...props}/>)}/>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )}/>
            </div>
        )
    }
}