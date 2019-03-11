import React from "react";
import {MenuItemList, ManagerCreateMenuItemDialog} from "./subcomponents/MenuItem";
import {ManagerCreateTagDialog} from "./subcomponents/Tag";

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
        this.state = {pageSize: 10, selectedView: 'Manager'};
    }

    componentDidMount() {
        this.props.loadResourceFromServer('menuItems', this.state.pageSize);
        this.props.loadResourceFromServer('tags', this.state.pageSize);
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
                                          menuItems={this.props.menuItems}
                                          pageSize={this.state.pageSize}
                                          menuItemAttributes={this.props.menuItemAttributes}
                                          menuItemLinks={this.props.menuItemLinks}
                                          onNavigate={this.props.onNavigate}
                                          updatePageSize={this.props.updatePageSize}
                                          onUpdate={this.props.onUpdate}
                                          onDelete={this.props.onDelete}/>
                        </div>
                        <div className="col-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <ManagerCreateMenuItemDialog menuItemAttributes={this.props.menuItemAttributes}
                                                                 menuItemLinks={this.props.menuItemLinks}
                                                                 onCreate={this.props.onCreate}/>
                                </div>

                                <div className="row mt-3">
                                    <ManagerCreateTagDialog
                                        onCreate = {this.props.onCreate}
                                        tagAttributes = {this.props.tagAttributes}
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