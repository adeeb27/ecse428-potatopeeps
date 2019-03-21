'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

/** ----- COMPONENT IMPORTS -----**/
import {MenuItemList, ManagerCreateMenuItemDialog} from "./subcomponents/MenuItem";
import {ManagerCreateTagDialog} from "./subcomponents/Tag";

/** ----- CSS/STYLING IMPORTS -----**/
import "../../resources/static/css/manager.css";
import "../../resources/static/css/external/bootstrap.min.css";

/**
 * This React Component contains all code related to the rendering of the 'Manager' view.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file and their related files.
 */
export class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pageSize: 30, selectedView: 'Manager'};
    }



    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization
     * that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to
     * instantiate the network request. - (Description from ReactJS Docs)
     *
     * We load menuItems and tags from the server as these are the only resources we consider to be relevant to the
     * manager perspective.
     *
     * Link to componentDidMount() docs: https://reactjs.org/docs/react-component.html#componentdidmount
     */
    componentDidMount() {
        this.props.loadResourceFromServer('menuItems', this.state.pageSize);
        this.props.loadResourceFromServer('tags', this.state.pageSize);
    }

    /**
     * render - Render a React element into the DOM in the supplied container and return a reference to the component
     *
     * @returns The HTML/JSX code to be displayed by this element. In this case, we return the view for a Manager - this
     * contains calls/renderings of the MenuItemList, ManagerCreateMenuItemDialog and ManagerCreateTagDialog components.
     */
    render() {
        const tagList = this.props.tags.map(tag =>
            ({label: tag.entity.name, value: tag, key: tag.entity._links.self.href})
        );
        return (
            <div className="page manager-page">
                <div id="header" className="container-fluid">
                    <div className="row">
                        <div className="col-7">
                        </div>
                        <div className="col-4 text-right">
                            <b>MANAGER VIEW</b>
                        </div>
                        <div className="col-1 text-right">
                            <Button id="logout-btn" className="btn btn-danger" type="button">
                                {"Logout"}
                                <FontAwesomeIcon icon={faSignOutAlt}/>
                            </Button>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-3">
                            <h2>Menu & Inventory</h2>
                        </div>
                        <div className="col-6" >
                            <Select options={tagList}
                                    onChange={selectedTags =>
                                        this.props.filterMenuItemList(this.state.selectedView, selectedTags)}
                                    isMulti/>
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </div>

                <div id="main-table-container" className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            {/* Renders a MenuItemList component here */}
                            <MenuItemList selectedView={this.state.selectedView}
                                          menuItems={this.props.menuItems}
                                          pageSize={this.state.pageSize}
                                          tags={this.props.tags}
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
                                    <div className="col-12">
                                        <h3>Add A Menu Item</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    {/* Renders a ManagerCreateMenuItemDialog component here */}
                                    <ManagerCreateMenuItemDialog menuItemAttributes={this.props.menuItemAttributes}
                                                                 menuItemLinks={this.props.menuItemLinks}
                                                                 tags={this.props.tags}
                                                                 tagList={tagList}
                                                                 onCreate={this.props.onCreate}/>
                                </div>

                                <div className="row mt-3">
                                    {/* Renders a ManagerCreateTagDialog component here */}
                                    <ManagerCreateTagDialog
                                        onCreate = {this.props.onCreate}
                                        tagAttributes = {this.props.tagAttributes}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}