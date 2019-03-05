import React from "react";
import ReactDOM from 'react-dom';
import {App} from "./components/App";
import {HashRouter, Route} from "react-router-dom";
import registerServiceWorker from "./regsterServiceWorker";


ReactDOM.render(
    <HashRouter>
        <Route path="/" component={App} />
    </HashRouter>,
    document.getElementById('root')
);

registerServiceWorker();