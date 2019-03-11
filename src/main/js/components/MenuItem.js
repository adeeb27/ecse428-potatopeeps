import React from "react";
import ReactDOM from "react-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export class MenuItemList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if(this.props.selectedView === 'Manager')
            return (<ManagerMenuItemList menuItems={this.props.menuItems}
                                         links={this.props.links}
                                         pageSize={this.props.pageSize}
                                         attributes={this.props.attributes}
                                         onNavigate={this.props.onNavigate}
                                         updatePageSize={this.props.updatePageSize}
                                         onUpdate={this.props.onUpdate}
                                         onDelete={this.props.onDelete}/>);

        else if(this.props.selectedView === 'Customer')
            return (<CustomerMenuItemList />);

    }

}



class ManagerMenuItemList extends React.Component {

    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }

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

    render() {
        const menuItems = this.props.menuItems.map(menuItem =>
            <ManagerMenuItem key={menuItem.entity._links.self.href}
                             menuItem={menuItem}
                             attributes={this.props.attributes}
                             onUpdate={this.props.onUpdate}
                             onDelete={this.props.onDelete} />
        );

        return (
            <div id="menu-items" className="table-responsive">
                <table id="main-table" className="table table-striped">
                    <tbody>
                    <tr>
                        <th>Tags</th>
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

}

class ManagerMenuItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tags: []};
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.menuItem);
    }

    render(){
        return (
            <tr>
                <td>--</td>
                <td>{this.props.menuItem.entity.name}</td>
                <td>{this.props.menuItem.entity.description}</td>
                <td>{this.props.menuItem.entity.price}</td>
                <td>{this.props.menuItem.entity.inventory}</td>
                <td>

                    <ManagerUpdateMenuItemDialog menuItem={this.props.menuItem}
                                      attributes={this.props.attributes}
                                      onUpdate={this.props.onUpdate}/>
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
 * Holds the code related to updating menu items from the Manager View Page.
 * NOTE: was implemented through the use of a popup
 * TODO: refactor for integration of correct UI and general commenting
 * @author Gabriel Negash, Evan Bruchet
 */
class ManagerUpdateMenuItemDialog extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {modalIsOpen : false, show: false}; // Set the default state of every menu item's modal to be closed
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSubmit(e) {
        e.preventDefault();
        const updatedMenuItem = {};
        this.props.attributes.forEach(attribute => {
            updatedMenuItem[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onUpdate(this.props.menuItem, updatedMenuItem);
        this.handleShow();
    }

    render() {
        const inputs = this.props.attributes.map(attribute =>
            <div key={"row-" + this.props.menuItem.entity._links.self.href + "-" + attribute} className="row">
                <div key={"col-" + this.props.menuItem.entity._links.self.href + "-" + attribute} className="form-group col">
                    <label key={"label-" + this.props.menuItem.entity._links.self.href + "-" + attribute}
                           htmlFor={"update-" + this.props.menuItem.entity._links.self.href + "-" + attribute}>
                        {attribute.toUpperCase()}
                    </label>
                    <input key={"input-" + this.props.menuItem.entity._links.self.href + "-" + attribute}
                           id={"update-" + this.props.menuItem.entity._links.self.href + "-" + attribute}
                           type="text" placeholder={attribute}
                           defaultValue={this.props.menuItem.entity[attribute]}
                           ref={attribute} className="field form-control"/>
                </div>
            </div>
        );


        return (
            <div>
                <button className="btn btn-warning" onClick={this.handleShow}>Update</button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Update A Menu Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            {inputs}
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}


/**
 * Holds the code related to creating menu items.
 * TODO: refactor for integration of correct UI
 * @author Ryan Dotsikas, Evan Bruchet
 */
export class ManagerCreateMenuItemDialog extends React.Component {
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

        function isDescription(attribute) {
            return attribute === 'description'
        }

        const formInputs = this.props.attributes.map(attribute =>
            <div key={"create-row-" + attribute} className="row">
                <div key={"create-col-" + attribute} className="form-group col">
                    <label key={"create-label-" + attribute}
                           htmlFor={"create-" + attribute}>
                        {attribute.toUpperCase()}
                    </label>

                    <input key={"create-input-" + attribute}
                           id={"create-" + attribute}
                           type="text" placeholder={"Enter " + attribute}
                           ref={attribute} className="field form-control"/>
                </div>
            </div>

        );

        return (
                <div className="col-12">
                    <form>
                        {formInputs}
                        <div className="dropdown-divider" />
                        <div className="row">
                            <div className="col">
                                <Button className="btn btn-primary btn-block" onClick={this.handleSubmit}>
                                    Create
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
        )
    }
}


class CustomerMenuItemList extends React.Component {

}

class CustomerMenuItem extends React.Component {

}
