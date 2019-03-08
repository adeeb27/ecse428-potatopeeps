import React from "react";
import ReactDOM from "react-dom";


/**
 * This JS file contains all code related to the rendering of the 'Manager' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

export class Manager extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {menuItems: [], tags: [], attributes: [], pagesize: 2, links: {}};
    //     this.updatePageSize = this.updatePageSize.bind(this);
    //     this.onCreate = this.onCreate.bind(this);
    //     this.onDelete = this.onDelete.bind(this);
    //     this.onNavigate = this.onNavigate.bind(this);
    // }
    //
    // loadFromServer(pageSize) {
    //     follow(client, root, [
    //         {rel: 'menuItems', params: {size: pageSize}}]
    //     ).then(menuItemCollection => {
    //         return client({
    //             method: 'GET',
    //             path: menuItemCollection.entity._links.profile.href,
    //             headers: {'Accept': 'application/schema+json'}
    //         }).then(schema => {
    //             this.schema = schema.entity;
    //             return menuItemCollection;
    //         });
    //     }).done(menuItemCollection => {
    //         this.setState({
    //             menuItems: menuItemCollection.entity._embedded.menuItems,
    //             attributes: Object.keys(this.schema.properties).filter(attribute => attribute !== 'tags' && attribute !== 'orders'),
    //             pageSize: pageSize,
    //             links: menuItemCollection.entity._links});
    //     });
    // }
    //
    // onCreate(newMenuItem) {
    //     follow(client, root, ['menuItems']).then(menuItemCollection => {
    //         return client({
    //             method: 'POST',
    //             path: menuItemCollection.entity._links.self.href,
    //             entity: newMenuItem,
    //             headers: {'Content-Type': 'application/json'}
    //         })
    //     }).then(response => {
    //         return follow(client, root, [
    //             {rel: 'menuItems', params: {'size': this.state.pageSize}}]);
    //     }).done(response => {
    //         if (typeof response.entity._links.last !== "undefined") {
    //             this.onNavigate(response.entity._links.last.href);
    //         } else {
    //             this.onNavigate(response.entity._links.self.href);
    //         }
    //     });
    // }
    // // end::create[]
    //
    // // tag::delete[]
    // onDelete(menuItem) {
    //     client({method: 'DELETE', path: menuItem._links.self.href}).done(response => {
    //         this.loadFromServer(this.state.pageSize);
    //     });
    // }
    // // end::delete[]
    //
    // // tag::navigate[]
    // onNavigate(navUri) {
    //     client({method: 'GET', path: navUri}).done(menuItemCollection => {
    //         this.setState({
    //             menuItems: menuItemCollection.entity._embedded.menuItems,
    //             attributes: this.state.attributes,
    //             pageSize: this.state.pageSize,
    //             links: menuItemCollection.entity._links
    //         });
    //     });
    // }
    // // end::navigate[]
    //
    // // tag::update-page-size[]
    // updatePageSize(pageSize) {
    //     if (pageSize !== this.state.pageSize) {
    //         this.loadFromServer(pageSize);
    //     }
    // }
    // // end::update-page-size[]
    //
    // // tag::follow-1[]
    // componentDidMount() {
    //     this.loadFromServer(this.state.pageSize);
    // }

    render() {
        return (
            <div class="page manager-page">
                <h3>The Manager Page</h3>
            </div>
        )
    }
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

/***
 * Holds list of menuItems
 * TODO: integrate UI of Manager
 * NOTE: Renamed from MenuItemList
 */
class ManagerMenu extends React.Component {

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
        window.location = "#";
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


