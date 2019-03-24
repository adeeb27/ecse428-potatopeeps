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

/**
 * This React Component contains all code related to the rendering of a MenuItemList - being either the Customer or
 * Manager view of such a list. Uses rudimentary conditional rendering based on the 'selectedView' prop passed down
 * from its parent component in Customer.js or Manager.js, respectively.
 */
export class MenuItemList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        /* Returns the Manager 'version' of the MenuItemList if the selectedView property is set to Manager. */
        if (this.props.selectedView === 'Manager')
            return (<ManagerMenuItemList menuItems={this.props.menuItems}
                                         tags={this.props.tags}
                                         pageSize={this.props.pageSize}
                                         attributes={this.props.attributes}
                                         menuItemAttributes={this.props.menuItemAttributes}
                                         menuItemLinks={this.props.menuItemLinks}
                                         onNavigate={this.props.onNavigate}
                                         updatePageSize={this.props.updatePageSize}
                                         onUpdate={this.props.onUpdate}
                                         onDelete={this.props.onDelete}/>);
        /* Returns the Customer 'version' of the MenuItemList if the selectedView property is set to Customer. */
        else if (this.props.selectedView === 'Customer')
            return (<CustomerMenuItemList updateCustomerCart={this.props.updateCustomerCart}
                                          menuItems={this.props.menuItems}
                                          pageSize={this.props.pageSize}
                                          attributes={this.props.attributes}
                                          menuItemAttributes={this.props.menuItemAttributes}
                                          menuItemLinks={this.props.menuItemLinks}
                                          menuItemTags={this.props.menuItemTags}
                                          onNavigate={this.props.onNavigate}
                                          updatePageSize={this.props.updatePageSize}
                                          filterMenuItemList={this.props.filterMenuItemList}
                                          customerFilter={this.props.customerFilter}
                                          selectedTableNumber={this.props.selectedTableNumber}
                                          tagName={this.props.tagName}/>);
    }
}

/**
 * This React Component contains all code related to the rendering of the Manager 'view' of a MenuItemList, referenced
 * above.
 */
class ManagerMenuItemList extends React.Component {

    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
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

    handleNavFirst(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.menuItemLinks.first.href, 'menuItems');
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.menuItemLinks.prev.href, 'menuItems');
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.menuItemLinks.next.href, 'menuItems');
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.menuItemLinks.last.href, 'menuItems');
    }


    /**
     * render - Render a React element into the DOM in the supplied container and return a reference to the component
     *
     * @returns The HTML/JSX code to be displayed by this element. In this case, we return the ManagerMenuItemList
     * defined above, along with buttons beneath said list to navigate in between its pages.
     */
    render() {
        const menuItems = this.props.menuItems.map(menuItem =>
            <ManagerMenuItem key={menuItem.entity._links.self.href}
                             menuItem={menuItem}
                             menuItemAttributes={this.props.menuItemAttributes}
                             tags={this.props.tags}
                             onUpdate={this.props.onUpdate}
                             onDelete={this.props.onDelete}/>
        );

        const navLinks = [
            <Button key="first" variant="outline-primary" onClick={this.handleNavFirst}><FontAwesomeIcon
                icon={faAngleDoubleLeft}/></Button>,
            <Button key="prev" variant="outline-primary" onClick={this.handleNavPrev}><FontAwesomeIcon
                icon={faAngleLeft}/></Button>,
            <Button key="next" variant="outline-primary" onClick={this.handleNavNext}><FontAwesomeIcon
                icon={faAngleRight}/></Button>,
            <Button key="last" variant="outline-primary" onClick={this.handleNavLast}><FontAwesomeIcon
                icon={faAngleDoubleRight}/></Button>
        ];

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
                        <th/>
                        <th/>
                    </tr>
                    {menuItems}
                    </tbody>
                </table>
                <div>
                    {navLinks}
                </div>
            </div>
        )
    }

}

/**
 * This React Component contains all code related to the rendering of the Manager 'view' of a MenuItem, referenced
 * above in ManagerMenuItemList.
 */
class ManagerMenuItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {menuItemTags: []};
        this.handleDelete = this.handleDelete.bind(this);
        this.requestTags = this.requestTags.bind(this);
    }

    /**
     * handleDelete - handles the submission of the delete request on the given menuItem, by calling the onDelete function
     * defined in App.js.
     */
    handleDelete() {
        this.props.onDelete(this.props.menuItem, 'menuItems');
    }

    /**
     * requestTags - uses Fetch-API to request a JSON resource at a provided URL using the fetch method to return a
     * JavaScript object. I used this to load the tags of the current MenuItem to display in the table - consider reusing
     * this for the Customer.js view.
     *
     * Link to Fetch API Introduction: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
     */
    requestTags() {
        fetch(this.props.menuItem.entity._links.tags.href, {
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
                        this.setState({menuItemTags: data._embedded.tags});
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization
     * that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to
     * instantiate the network request. - (Description from ReactJS Docs)
     *
     * I use this to call the requestTags method defined above - probably a better way of doing this, open to suggestions.
     *
     * Link to componentDidMount() docs: https://reactjs.org/docs/react-component.html#componentdidmount
     */
    componentDidMount() {
        this.requestTags();
    }

    /**
     * render - Render a React element into the DOM in the supplied container and return a reference to the component
     *
     * @returns The HTML/JSX code to be displayed by this element. In this case, we simply display the ManagerMenuItem
     * entry in the list - this includes the majority of information about it, along with an update and delete button,
     * that call the onUpdate and onDelete methods defined in App.js, respectively.
     */
    render() {

        const tags = this.state.menuItemTags.map((tag, index) =>
            <span
                key={"menu-item-list-tag-" + tag._links.self.href + "-menu-item-" + this.props.menuItem.entity._links.self.href}>
                {index === this.state.menuItemTags.length - 1 ? tag.name : tag.name + ', '}
            </span>
        );

        return (
            <tr>
                <td>{tags}</td>
                <td>{this.props.menuItem.entity.name}</td>
                <td>{this.props.menuItem.entity.description}</td>
                <td>{this.props.menuItem.entity.price}</td>
                <td>{this.props.menuItem.entity.inventory}</td>
                <td>

                    <ManagerUpdateMenuItemDialog tags={this.props.tags}
                                                 menuItem={this.props.menuItem}
                                                 menuItemAttributes={this.props.menuItemAttributes}
                                                 menuItemTags={this.state.menuItemTags}
                                                 requestTags={this.requestTags}
                                                 onUpdate={this.props.onUpdate}/>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.handleDelete}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </td>
            </tr>
        )
    }

}

/**
 * Holds the code related to updating menu items from the Manager 'view'.
 * NOTE: was implemented through the use of a modal (popup window)
 *
 * @author Gabriel Negash, Evan Bruchet
 */
let updateSelectTagPaths = [];

class ManagerUpdateMenuItemDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state={selectedOptions: []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.state = {modalIsOpen: false, show: false}; // Set the default state of every menu item's modal to be closed
    }

    /**
     * handleClose - sets the 'show' state variable to false, closing any Update Modal Dialogs currently opened.
     */
    handleClose() {
        this.setState({show: false});
    }

    /**
     * handleShow - sets the 'show' state variable to true, closing the relevant Update Modal Dialog.
     */
    handleShow() {
        this.setState({show: true});
    }

    /**
     * handleSubmit - handles the submission of the update request on the given menuItem, by calling the onUpdate function
     * defined in App.js.
     * @param e - the event passed upon clicking the update button - used to prevent the default form submission behaviour.
     */
    handleSubmit(e) {
        e.preventDefault();
        const updatedMenuItem = {};
        this.props.menuItemAttributes.forEach(attribute => {
            updatedMenuItem[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });

        updatedMenuItem['tags'] = updateSelectTagPaths;
        this.props.onUpdate(this.props.menuItem, updatedMenuItem, 'menuItems');
        this.props.requestTags('update');
        setTimeout(() => {
            this.props.requestTags('update')
        }, 500);

        this.handleClose();
    }

    handleSelectChange(selectedTags) {
        updateSelectTagPaths = [];
        this.setState({selectedOptions: selectedTags});
        selectedTags.map(selectedTag => updateSelectTagPaths.push(selectedTag.key));
    }


    /**
     * render - Render a React element into the DOM in the supplied container and return a reference to the component.
     *
     * @returns The HTML/JSX code to be displayed by this element. In this case, we return the UpdateMenuDialog, i.e.,
     * the modal dialog used to display it and its associated form.
     */
    render() {
        const inputs = this.props.menuItemAttributes.map(attribute =>
            <div key={"row-" + this.props.menuItem.entity._links.self.href + "-" + attribute} className="row">
                <div key={"col-" + this.props.menuItem.entity._links.self.href + "-" + attribute}
                     className="form-group col">
                    <label key={"label-" + this.props.menuItem.entity._links.self.href + "-" + attribute}
                           htmlFor={"update-" + this.props.menuItem.entity._links.self.href + "-" + attribute}>
                        {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                    </label>
                    <input key={"input-" + this.props.menuItem.entity._links.self.href + "-" + attribute}
                           id={"update-" + this.props.menuItem.entity._links.self.href + "-" + attribute}
                           type="text" placeholder={attribute}
                           defaultValue={this.props.menuItem.entity[attribute]}
                           ref={attribute} className="field form-control"/>
                </div>
            </div>
        );

        const tagList = this.props.tags.map(tag =>
            ({label: tag.entity.name, value: tag.entity.name, key: tag.entity._links.self.href}));

        const existingTagList = this.props.tags.map(tag =>
            ({label: tag.entity.name, value: tag.entity.name, key: tag.entity._links.self.href}))
                .filter(tag => this.props.menuItemTags
                    .map(menuItemTag => menuItemTag.name)
                        .includes(tag.label));

        const { selectedOptions } = this.state;

        return (
            <div>
                <Button className="btn btn-warning" onClick={this.handleShow}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Update A Menu Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {inputs}
                        <div className="row">
                            <div className="form-group col">
                                <label>
                                    Tags
                                </label>
                                <Select value={selectedOptions}
                                        defaultValue={existingTagList}
                                        options={tagList}
                                        onChange={selectedTags => this.handleSelectChange(selectedTags)}
                                        isMulti />
                            </div>
                        </div>
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
 * Holds the code related to creating menu items from the Manager 'view'.
 * @author Ryan Dotsikas, Evan Bruchet
 */

let selectedTagPaths = [];

export class ManagerCreateMenuItemDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectedOptions: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newMenuItem = {};
        this.props.menuItemAttributes.forEach(attribute => {
            newMenuItem[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });

        newMenuItem['tags'] = selectedTagPaths;

        this.props.onCreate(newMenuItem, 'menuItems');

        // clear out the dialog's inputs
        this.props.menuItemAttributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });

        this.setState({selectedOptions: []});
    }

    handleSelectChange(selectedTags) {
        selectedTagPaths = [];
        this.setState({selectedOptions: selectedTags});
        selectedTags.map(selectedTag => selectedTagPaths.push(selectedTag.key));
    }

    /**
     * render - Render a React element into the DOM in the supplied container and return a reference to the component
     *
     * @returns The HTML/JSX code to be displayed by this element. In this case, we return the simple CreateMenuItem
     * form seen on the right of the Manager.js page.
     */
    render() {
        const formInputs = this.props.menuItemAttributes.map(attribute =>
            <div key={"create-row-" + attribute} className="row">
                <div key={"create-col-" + attribute} className="form-group col">
                    <label key={"create-label-" + attribute}
                           htmlFor={"create-" + attribute}>
                        {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                    </label>

                    <input key={"create-input-" + attribute}
                           id={"create-" + attribute}
                           type="text" placeholder={"Enter " + attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                           ref={attribute} className="field form-control"/>
                </div>
            </div>
        );

        const tagList = (this.props.tags.map(tag =>
            ({label: tag.entity.name, value: tag.entity.name, key: tag.entity._links.self.href})
        ));

        const { selectedOptions } = this.state;

        return (
            <div className="col-12">
                <form>
                    {formInputs}
                    <div className="row">
                        <div className="form-group col">
                            <label>
                                Tags
                            </label>
                            <Select value={selectedOptions}
                                    options={tagList}
                                    onChange={selectedTags => this.handleSelectChange(selectedTags)}
                                    isMulti />
                        </div>
                    </div>
                    <div className="dropdown-divider"/>
                    <div className="row">
                        <div className="col">
                            <Button className="btn btn-primary btn-block" onClick={this.handleSubmit}>
                                Add Menu Item
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


export class CustomerMenuItemList extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * render - Render a React element into the DOM in the supplied container and return a reference to the component
     *
     * @returns The HTML/JSX code to be displayed by this element. In this case, we return the ManagerMenuItemList
     * defined above, along with buttons beneath said list to navigate in between its pages.
     */

    render() {
        const menuItems = this.props.menuItems.map(menuItem =>
            <CustomerMenuItem key={menuItem.entity._links.self.href}
                              selectedTableNumber={this.props.selectedTableNumber}
                              updateCustomerCart={this.props.updateCustomerCart}
                              menuItem={menuItem}
                              menuItems={this.props.menuItems}
                              menuItemAttributes={this.props.menuItemAttributes}/>
        );


        return(
            <div className="content-wrap full-width">
                <div className="gridViewContainer">
                    {menuItems}
                </div>
                <footer>
                    <div className="signature">
                        <h6>Sushi</h6>
                        <h5>PotatoPeeps</h5>
                    </div>
                </footer>
            </div>

        );
    }
}

export class CustomerMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {menuItemTags: []};
        this.requestTags = this.requestTags.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    }

    handleMenuItemClick(e){
        e.preventDefault();
        console.log("Clicked Menu Item Click");
        this.props.updateCustomerCart(this.props.menuItem, this.props.selectedTableNumber);
    }

    /**
     * requestTags - uses Fetch-API to request a JSON resource at a provided URL using the fetch method to return a
     * JavaScript object. I used this to load the tags of the current MenuItem to display in the table - consider reusing
     * this for the Customer.js view.
     *
     * Link to Fetch API Introduction: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
     */
    requestTags() {
        fetch(this.props.menuItem.entity._links.tags.href, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(
                response => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then((data) => {
                        this.setState({menuItemTags: data._embedded.tags});
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization
     * that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to
     * instantiate the network request. - (Description from ReactJS Docs)
     *
     * I use this to call the requestTags method defined above - probably a better way of doing this, open to suggestions.
     *
     * Link to componentDidMount() docs: https://reactjs.org/docs/react-component.html#componentdidmount
     */
    componentDidMount() {
        this.requestTags();
    }

    /**
     * render - Render a React element into the DOM in the supplied container and return a reference to the component
     *
     * @returns The HTML/JSX code to be displayed by this element. In this case, we simply display the CustomerMenuItem
     * entry in the list - this includes the majority of information about it
     */
    render() {
        return (

            <div className="gridViewItem">
                <img className="itemImage" draggable="false" src="./img/4.jpg"/>
                <div className="overlay">
                    <div className="text">
                        <b>
                            {this.props.menuItem.entity.name}
                        </b>
                        <div className="dropdown-divider"/>
                    </div>
                    <div className="text">{this.props.menuItem.entity.description}</div>
                    <div className="text">{"$ " + this.props.menuItem.entity.price.toFixed(2)}</div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className="add-to-cart-button" title="Add to cart"  onClick={this.handleMenuItemClick}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}
