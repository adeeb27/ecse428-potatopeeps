import React from "react";
//import Button from "./Manager";

/**
 * This JS file contains all code related to the rendering of the 'Staff' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

export class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.goToOrderPage = this.goToOrderPage.bind(this);
    }

    goToOrderPage(e) {
        e.preventDefault();
        this.props.history.push('/order');
    }

    render() {
        return (
            <div className={"page"}>
                <button type="button" onClick={this.goToOrderPage}>Test</button>
                /*<StaffLanding/>*/
            </div>
        )
    }
}

class StaffLanding extends React.Component {
    //onClick={this.goToOrderPage()}

    render(){
        return (
            <div>
                The Staff Page
            </div>
        )
    }

}