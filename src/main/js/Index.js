import React from "react";
import ReactDOM from 'react-dom';
import {App} from "./components/App";
import {HashRouter, Route} from "react-router-dom";
import registerServiceWorker from "./regsterServiceWorker";


/**
 * This file simply serves as the entry point for our Application, and additionally as the 'wrapper' for
 * the Routes outlined in the App.js file.
 *
 * Note I used HashRouters as traditional Routers conflicted with Spring Web's default routing, and I was unable to
 * resolve it - there is NO noticeable difference in functionality aside from having to write the intermediary '#'
 *
 * Relevant Link: https://reacttraining.com/react-router/web/api/Route
 * @Author Evan Bruchet
 */
ReactDOM.render(
    <HashRouter>
        <Route path="/" component={App} />
    </HashRouter>,
    document.getElementById('root')
);

registerServiceWorker();