const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

/*
* This file is the React JS equivalent of Java's 'main' method, and
* is the entry point of the application.
*
*
* Note to everyone on the team - the majority of the components
* displayed below are unlikely to stay within this file, these are simply
* here to act as a proof of concept for the rest of the team and serve
* as reference for future code additions.
* */

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {menuItems: [], tags: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/menuItems'}).done(response => {
            this.setState({menuItems: response.entity._embedded.menuItems});
        });
        client({method: 'GET', path: '/api/tags'}).done(response => {
            this.setState({tags: response.entity._embedded.tags});
        });
    }

    render() {
        return (
            <div>
                <h1>ECSE 428 - PotatoPeeps RestoApp</h1>
                <MenuItemList menuItems={this.state.menuItems}/>
                <TagList tags={this.state.tags}/>
            </div>
        )
    }
}

class MenuItemList extends React.Component {
    render() {
        const menuItems = this.props.menuItems.map(menuItem =>
            <MenuItem key={menuItem._links.self.href} menuItem={menuItem}/>
        );
        return (
            <div>
                Menu Items Table
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                    {menuItems}
                    </tbody>
                </table>
            </div>
        )
    }
}

class MenuItem extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.menuItem.name}</td>
                <td>{this.props.menuItem.price}</td>
                <td>{this.props.menuItem.description}</td>
            </tr>
        )
    }
}

class TagList extends React.Component{
    render() {
        const tags = this.props.tags.map(tag =>
            <Tag key={tag._links.self.href} tag={tag}/>
        );
        return (
            <div>
                Tags Table
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                    </tr>
                    {tags}
                    </tbody>
                </table>
            </div>
        )
    }
}

class Tag extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.tag.name}</td>
            </tr>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)