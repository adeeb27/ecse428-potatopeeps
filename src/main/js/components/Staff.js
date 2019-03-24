import React from "react";

/**
 * This JS file contains all code related to the rendering of the 'Staff' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

export class Staff extends React.Component {
    render() {
        return (
            <div className={"page"}>
                <StaffLanding/>
            </div>
        )
    }
}

class StaffLanding extends React.Component {



    render(){
        return (
            <div>
                The Staff Page
            </div>
        )
    }

}