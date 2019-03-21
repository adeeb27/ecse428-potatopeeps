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
        <title>Menu for Staff</title>
        <link rel="stylesheet" id="style-css" href="./asset/css/style.css" type="text/css" media="all" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
        <div>
          <main className>
            <header className="detail full">
              <a href="#" className="back" data-transition="slide-from-top" />
              <section>
                <h1>Category 1</h1>
                <h3 className="page-badge">Healthy and Fresh</h3>    
              </section>
            </header>
            <div className="content-wrap full-width">
              <div className="gridViewContainer">
                <div className="gridViewItem">               
                  <img className="itemImage" draggable="false" src="./asset/4.jpg" />               
                  <div className="overlay">
                    <div className="text">Hello World</div>
                    <div className="text">$10.99</div>
                  </div> 
                </div>
                <div className="gridViewItem">               
                  <img className="itemImage" draggable="false" src="./asset/3.jpg" />               
                  <div className="overlay">
                    <div className="text">Hello World</div>
                    <div className="text">$10.99</div>
                  </div> 
                </div>
                <div className="gridViewItem">               
                  <img className="itemImage" draggable="false" src="./asset/2.jpg" />               
                  <div className="overlay">
                    <div className="text">Hello World</div>
                    <div className="text">$10.99</div>
                  </div> 
                </div>
                <div className="gridViewItem">               
                  <img className="itemImage" draggable="false" src="./asset/5.jpg" />               
                  <div className="overlay">
                    <div className="text">Hello World</div>
                    <div className="text">$10.99</div>
                  </div> 
                </div>
                <div className="gridViewItem">               
                  <img className="itemImage" draggable="false" src="./asset/6.jpg" />               
                  <div className="overlay">
                    <div className="text">Hello World</div>
                    <div className="text">$10.99</div>
                  </div> 
                </div>
                <div className="gridViewItem">               
                  <img className="itemImage" draggable="false" src="./asset/4.jpg" />               
                  <div className="overlay">
                    <div className="text">Hello World</div>
                    <div className="text">$10.99</div>
                  </div> 
                </div>
                <div className="gridViewItem">               
                  <img className="itemImage" draggable="false" src="./asset/2.jpg" />               
                  <div className="overlay">
                    <div className="text">Hello World</div>
                    <div className="text">$10.99</div>
                  </div> 
                </div>
              </div>
              <footer>
                <div className="signature">
                  <h6>Sushi</h6>
                  <h5>PotatoPeeps</h5>
                </div>
              </footer>        
            </div>
          </main>
        </div>
        <a href="#" id="back-to-top">
          <i className="icon bg icon-UpArrow" />
        </a>		
        <ul id="slideshow">
          <li style={{backgroundImage: 'url("./asset/5.jpg")', display: 'block', zIndex: 0}} />
          <li style={{backgroundImage: 'url("./asset/3.jpg")', display: 'block', zIndex: 0, animationDelay: '6s'}} />
          <li style={{backgroundImage: 'url("./asset/6.jpg")', display: 'block', zIndex: 0, animationDelay: '12s'}} />
          <li style={{backgroundImage: 'url("./asset/4.jpg")', display: 'block', zIndex: 0, animationDelay: '18s'}} />
          <li style={{backgroundImage: 'url("./asset/2.jpg")', display: 'block', zIndex: 0, animationDelay: '24s'}} />
        </ul>
      </div>
        )
    }

}