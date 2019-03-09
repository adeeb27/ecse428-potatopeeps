import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
// import ReactModal from "react-modal";
const root = "../api";

import when from "when";
import client from "../client";
import follow from "../follow";

import "../../resources/static/css/manager.css";
import "../../resources/static/css/external/bootstrap.min.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

/**
 * This JS file contains all code related to the rendering of the 'Manager' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */


Modal.setAppElement('#root');

export class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {menuItems: [], tags: [], attributes: [], pageSize: 10, links: {}};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onNavigate = this.onNavigate.bind(this);


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
            //this.page = menuItemCollection.entity.page;
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
                {rel: 'menuItems', params: {'size': this.state.pageSize}}]);
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
                            <ManagerMenuItemList menuItems={this.state.menuItems}
                                                 links = {this.state.links}
                                                 pageSize = {this.state.pageSize}
                                                 attributes={this.state.attributes}
                                                 onNavigate = {this.onNavigate}
                                                 updatePageSize = {this.updatePageSize}
                                                 onUpdate={this.onUpdate}
                                                 onDelete = {this.onDelete}
                                                 openModal = {this.openModal}
                                                 afterOpenModal={this.afterOpenModal}
                                                 closeModal={this.closeModal}
                                                 modalIsOpen = {this.state.modalIsOpen}
                                                 style={customStyles}/>
                        </div>
                        <div className="col-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <form>
                                            <div className="row">
                                                <div className="form-group col">
                                                    <label htmlFor="add-item-category-input">Category</label>
                                                    <input id="add-item-category-input" type="text" className="form-control" placeholder="Seafood"/>
                                                </div>
                                                <div className="form-group col">
                                                    <label htmlFor="add-item-name-input">Name</label>
                                                    <input id="add-item-name-input" type="text" className="form-control" placeholder="Sushi"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col">
                                                    <label htmlFor="add-item-description-input">Description</label>
                                                    <textarea id="add-item-description-input" className="form-control"
                                                              placeholder="Description"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="add-item-price-input">Price</label>
                                                    <input id="add-item-price-input" type="text" className="form-control" placeholder="9.99"/>
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="add-item-quantity-input">Quantity</label>
                                                    <input id="add-item-quantity-input" type="text" className="form-control" placeholder="100"/>
                                                </div>
                                            </div>
                                            <div className="dropdown-divider" />
                                            <div className="row">
                                                <div className="col">
                                                    <input id="add-item-btn" type="button" className="btn btn-primary btn-block"
                                                           value="Add Item"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <h3>Add A Tag</h3>
                                        <form>
                                            <div className="row">
                                                <div className="form-group col">
                                                    <input id="add-tag-name-input" type="text" className="form-control" placeholder="Seafood"/>
                                                </div>
                                                <div className="form-group col">
                                                    <input id="add-tag-btn" type="button" className="btn btn-primary btn-block"
                                                           value="Add Tag"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/***
 * Holds list of menuItems
 * TODO: integrate UI of Manager
 * NOTE: Renamed from MenuItemList
 */
class ManagerMenuItemList extends React.Component {

    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }

    // tag::handle-page-size-updates[]
    handleInput(e) {
        e.preventDefault();
        const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value =
                pageSize.substring(0, pageSize.length - 1);
        }
    }
    // end::handle-nav[]

    // tag::menuItem-list-render[]
    render() {
        const menuItems = this.props.menuItems.map(menuItem =>
            <MenuItem key={menuItem.entity._links.self.href}
                      menuItem={menuItem}
                      attributes={this.props.attributes}
                      onUpdate={this.props.onUpdate}
                      onDelete={this.props.onDelete}
                      openModal = {this.props.openModal}
                      afterOpenModal={this.props.afterOpenModal}
                      closeModal={this.props.closeModal}
                      modalIsOpen = {this.props.modalIsOpen}
                      style={this.props.style}/>
        );


        return (
            <div id="menu-items" className="table-responsive">
                <table id="main-table" className="table table-striped">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th />
                        <th />
                    </tr>
                    {menuItems}
                    </tbody>
                </table>
            </div>
        )
    }
    // end::menuItem-list-render[]
}

/***
 * Holds the code for a specific menu item
 *
 */
// tag::menuItem[]
class MenuItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.menuItem);
    }

    render() {
        return (
            <tr>
                <td>{this.props.menuItem.entity.name}</td>
                <td>{this.props.menuItem.entity.description}</td>
                <td>{this.props.menuItem.entity.price}</td>
                <td>{this.props.menuItem.entity.inventory}</td>
                <td>

                    <UpdateItemDialog menuItem={this.props.menuItem}
                                      attributes={this.props.attributes}
                                      onUpdate={this.props.onUpdate}
                                      openModal = {this.props.openModal}
                                      afterOpenModal={this.props.afterOpenModal}
                                      closeModal={this.props.closeModal}
                                      modalIsOpen = {this.props.modalIsOpen}
                                      style={this.props.style}/>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.handleDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </td>
            </tr>
        )
    }
}

/**
 * Holds the code related to creating menu items.
 * NOTE: was implemented through the use of a popup
 * TODO: refactor for integration of correct UI
 * @author Ryan Dotsikas
 */
// tag::create-dialog[]
class CreateItemDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newMenuItem = {};
        this.props.attributes.forEach(attribute => {
            newMenuItem[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onCreate(newMenuItem);

        // clear out the dialog's inputs
        this.props.attributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });

        // Navigate away from the dialog to hide it.
        window.location = "#/manager";
    }

    render() {
        const inputs = this.props.attributes.map(attribute =>
            <p key={attribute}>
                <input type="text" placeholder={attribute} ref={attribute} className="field"/>
            </p>
        );

        return (
            <div>
                <a href="#createMenuItem">Create</a>

                <div id="createMenuItem" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Create new menu item</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}


class UpdateItemDialog extends React.Component { //TODO might need to move after menuitem class

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {modalIsOpen : false};

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleSubmit(e) {
        e.preventDefault();
        const updatedMenuItem = {};
        this.props.attributes.forEach(attribute => {
            updatedMenuItem[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onUpdate(this.props.menuItem, updatedMenuItem);
        window.location = "#/manager";
    }

    render() {
        const inputs = this.props.attributes.map(attribute =>
            <p key={this.props.menuItem.entity[attribute]}>
                <input type="text" placeholder={attribute}
                       defaultValue={this.props.menuItem.entity[attribute]}
                       ref={attribute} className="field"/>
            </p>
        );

        const dialogId = "updateMenuItem-" + this.props.menuItem.entity._links.self.href;

        return (
            <div>
                <button className="btn btn-warning" onClick={this.openModal}>Update</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={this.props.style}
                    contentLabel={"update-modal-" + this.props.menuItem.entity['name']}
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <h5 className="">Update Menu Item</h5>
                            </div>
                        </div>
                        {/*<form>*/}
                            <div className="row">
                                <div className="col-12">
                                    <div className="">
                                        {inputs}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="modal-footer">
                                        <button className="btn btn-block btn-lg btn-primary" onClick={this.handleSubmit}>Update</button>
                                    </div>
                                </div>
                            </div>
                        {/*</form>*/}
                    </div>

                </Modal>
                {/*<a href={"#" + dialogId} className="btn btn-warning">Update</a>*/}
                {/*<div id={dialogId} className="modalDialog">*/}
                    {/*<div>*/}
                        {/*<a href="#" title="Close" className="close">X</a>*/}

                        {/*<h2>Update a menuItem</h2>*/}

                        {/*<form>*/}
                            {/*{inputs}*/}
                            {/*<button onClick={this.handleSubmit}>Update</button>*/}
                        {/*</form>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        )
    }

}

/**
 * Holds the code related to creating tags.
 * TODO: Integration of correct UI, onCreate
 */
class CreateTagDialog extends React.Component {

}


/**
 * Holds the code for displaying specific tags
 * TODO: Refactor in case of dropdown selectable view
 */
class Tag extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.tag.name}</td>
            </tr>
        )
    }
}

const customStyles = {
    content : {
        // top                   : '50%',
        // left                  : '50%',
        // right                 : 'auto',
        // bottom                : 'auto',
        // marginRight           : '-50%',
        // transform             : 'translate(-50%, -50%)'
    }
};


