import React from "react";
const root = "../api";

import when from "when";
import client from "../client";
import follow from "../follow";
import {MenuItemList, ManagerCreateMenuItemDialog} from "./MenuItem";
import {ManagerCreateTagDialog} from "./Tag";

import "../../resources/static/css/manager.css";
import "../../resources/static/css/external/bootstrap.min.css";

/**
 * This JS file contains all code related to the rendering of the 'Manager' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

export class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {menuItems: [], tags: [], attributes: [], tagAttributes: [], pageSize: 10, links: {}, selectedView : 'Manager'};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.onCreateTag = this.onCreateTag.bind(this);
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'menuItems', params: {size: pageSize}}]
        ).then(menuItemCollection => {
            return client({
                method: 'GET',
                path: menuItemCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                this.links = menuItemCollection.entity._links;
                return menuItemCollection;
            });
        }).then(menuItemCollection => {
            return menuItemCollection.entity._embedded.menuItems.map(menuItem =>
                client({
                    method: 'GET',
                    path: menuItem._links.self.href
                })
            );
        }).then(menuItemPromises => {
            return when.all(menuItemPromises);
        }).done(menuItems => {
            this.setState({
                menuItems: menuItems,
                attributes: Object.keys(this.schema.properties).filter(attribute => attribute !== 'tags' && attribute !== 'orders'),
                pageSize: pageSize,
                links: this.links});
        });
    }

    loadTagsFromServer(pageSize) {
        follow(client, root, [
            {rel: 'tags', params: {size: pageSize}}]
        ).then(tagCollection => {
            return client({
                method: 'GET',
                path: tagCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(tagSchema => {
                this.tagSchema = tagSchema.entity;
                this.links = tagCollection.entity._links;
                return tagCollection;
            });
        }).then(tagCollection => {
            //this.page = menuItemCollection.entity.page;
            return tagCollection.entity._embedded.tags.map(tag =>
                client({
                    method: 'GET',
                    path: tag._links.self.href
                })
            );
        }).then(tagPromises => {
            return when.all(tagPromises);
        }).done(tags => {
            this.setState({
                tags: tags,
                tagAttributes: Object.keys(this.tagSchema.properties).filter(attribute => attribute !== 'menuItems'),
                pageSize: pageSize,
                links: this.links});
        });
    }

    onCreate(newMenuItem) {
        const self = this;
        follow(client, root, ['menuItems']).then(response => {
            return client({
                method: 'POST',
                path: response.entity._links.self.href,
                entity: newMenuItem,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'menuItems', params: {'size': self.state.pageSize}}]);
        }).done(response => {
            if (typeof response.entity._links.last !== "undefined") {
                this.onNavigate(response.entity._links.last.href);
            } else {
                this.onNavigate(response.entity._links.self.href);
            }
        });
    }
    // end::create[]

    //TODO: 'If-Match': testing on a local sql database leads to a stale request
    onUpdate(menuItem, updatedMenuItem) {
        client({ //TODO: can switch to POST & MenuITemCollection
            method: 'PUT',
            path: menuItem.entity._links.self.href,
            entity: updatedMenuItem,
            headers: {
                'Content-Type': 'application/json'
                // 'If-Match': menuItem.headers.Etag
            }
        }).done(response => {
            this.loadFromServer(this.state.pageSize);
        }, response => {
            if (response.status.code === 412) {
                alert('DENIED: Unable to update ' +
                    menuItem.entity._links.self.href + '. Your copy is stale.');
            }
        });
    }
    // end::update[]

    // tag::delete[]
    onDelete(menuItem) {
        client({method: 'DELETE', path: menuItem.entity._links.self.href}).done(response => {
            this.loadFromServer(this.state.pageSize);
        });
    }
    // end::delete[]

    // tag::navigate[]
    onNavigate(navUri) {
        client({method: 'GET', path: navUri
        }).then(menuItemCollection => {
            this.links = menuItemCollection.entity._links;

            return menuItemCollection.entity._embedded.menuItems.map(menuItem =>
                client({
                    method: 'GET',
                    path: menuItem._links.self.href
                })
            );
        }).then(menuItemPromises => {
            return when.all(menuItemPromises);
        }).done(menuItems => {
            this.setState({
                menuItems: menuItems,
                attributes: Object.keys(this.schema.properties).filter(attribute => attribute !== 'tags' && attribute !== 'orders'),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    onTagNavigate(navUri) {
        client({method: 'GET', path: navUri
        }).then(tagCollection => {
            this.links = tagCollection.entity._links;

            return tagCollection.entity._embedded.tags.map(tag =>
                client({
                    method: 'GET',
                    path: tag._links.self.href
                })
            );
        }).then(tagPromises => {
            return when.all(tagPromises);
        }).done(tags => {
            this.setState({
                tags: tags,
                tagAttributes: Object.keys(this.tagSchema.properties).filter(attribute => attribute !== 'menuItems'),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    // end::navigate[]

    // tag::update-page-size[]
    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            this.loadFromServer(pageSize);
        }
    }
    // end::update-page-size[]

    // tag::follow-1[]
    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
        this.loadTagsFromServer(this.state.pageSize);
    }


    onCreateTag(newTag){
        const self = this;
        follow(client, root, ['tags']).then(response => {
            return client({
                method: 'POST',
                path: response.entity._links.self.href,
                entity: newTag,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'tags', params: {'size': self.state.pageSize}}]);
        }).done(response => {
            if (typeof response.entity._links.last !== "undefined") {
                this.onTagNavigate(response.entity._links.last.href);
            } else {
                this.onTagNavigate(response.entity._links.self.href);
            }
        });

    }

    render() {
        return (
            <div className="page manager-page">
                <div id="header" className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                        </div>
                        <div className="col-3 text-right">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-9">
                                        Logged in as manager
                                    </div>
                                    <div className="col-3">
                                        <input id="logout-btn" className="btn btn-danger" type="button" value="Log out"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-3">
                            <h2>Menu & Inventory</h2>
                        </div>
                        <div className="col-6" />
                        <div className="col-3">
                            <h3>Add A Menu Item</h3>
                        </div>
                    </div>
                </div>

                <div id="main-table-container" className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <MenuItemList selectedView={this.state.selectedView}
                                          menuItems={this.state.menuItems}
                                          links={this.state.links}
                                          pageSize={this.state.pageSize}
                                          attributes={this.state.attributes}
                                          onNavigate={this.onNavigate}
                                          updatePageSize={this.updatePageSize}
                                          onUpdate={this.onUpdate}
                                          onDelete={this.onDelete}/>
                        </div>
                        <div className="col-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <ManagerCreateMenuItemDialog attributes={this.state.attributes}
                                                                 onCreate={this.onCreate}/>
                                </div>

                                <div className="row mt-3">
                                    <ManagerCreateTagDialog
                                        onCreateTag = {this.onCreateTag}
                                        tagAttributes = {this.state.tagAttributes}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}