import React from "react";
import ReactDOM from "react-dom";

/**
 * This JS file contains all code related to the rendering of the 'Customer' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

/***
 * Holds entire page view.
 * Todo: should include search by Tag bar (drop-down selectable items)
 * @See Tag
 *
 */
export class Customer extends React.Component {
    render() {
        return (
            <div className="page customer-page">
                <div>
                    <main className="" style={{overflow: 'hidden scroll'}}>

                    </main>
                </div>

                <a href="#" id="back-to-top">
                    <i className="icon bg icon-UpArrow" />
                </a>


                <ul id="slideshow">
                    <li id="slideshow-5" />
                    <li id="slideshow-3" />
                    <li id="slideshow-6" />
                    <li id="slideshow-4" />
                    <li id="slideshow-2" />
                </ul>
            </div>
        )
    }
}


export class CustomerLanding extends React.Component {

}

/***
 * Holds view of entire menu page
 * Should allow for parsing by tags, such that user inputs tags to search by
 * Then the corresponding menuItemList is added beneath
 * TODO: integrate UI of Customer, Parsing by Tags, ...
 */
export class CustomerMenu extends React.Component {



    render(){

    }
}

/***
 * Holds code for a specific menu item
 * Allows for adding to order
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
                <td>{this.props.menuItem.name}</td>
                <td>{this.props.menuItem.price}</td>
                <td>{this.props.menuItem.inventory}</td>
                <td>{this.props.menuItem.description}</td>
                <td>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}


class MenuItemList extends React.Component {

    constructor(props) {
        super(props);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
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
    // end::handle-page-size-updates[]

    // tag::handle-nav[]
    handleNavFirst(e){
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }
    // end::handle-nav[]

    // tag::menuItem-list-render[]
    render() {
        const menuItems = this.props.menuItems.map(menuItem =>
            <MenuItem key={menuItem._links.self.href} menuItem={menuItem} onDelete={this.props.onDelete}/>
        );

        const navLinks = [];
        if ("first" in this.props.links) {
            navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
        }
        if ("prev" in this.props.links) {
            navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
        }
        if ("next" in this.props.links) {
            navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
        }
        if ("last" in this.props.links) {
            navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
        }

        return (
            <div>
                <input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Inventory</th>
                        <th>Description</th>
                        <th></th>
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
    // end::menuItem-list-render[]
}

/***
 * View for a specific tag
 * TODO: refactor to a clickable dropdown item
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
