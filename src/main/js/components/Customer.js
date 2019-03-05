import React from "react";

/**
 * This JS file contains all code related to the rendering of the 'Customer' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
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
                    <i className="icon bg icon-UpArrow"></i>
                </a>


                <ul id="slideshow">
                    <li id="slideshow-5"></li>
                    <li id="slideshow-3"></li>
                    <li id="slideshow-6"></li>
                    <li id="slideshow-4"></li>
                    <li id="slideshow-2"></li>
                </ul>
            </div>
        )
    }
}


export class CustomerLanding extends React.Component {

}

export class CustomerMenu extends React.Component {



    render(){

    }
}

