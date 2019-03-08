import React from "react";
import "../../resources/static/css/manager.css";
import "../../resources/static/css/external/bootstrap.min.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

/**
 * This JS file contains all code related to the rendering of the 'Manager' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

export class Manager extends React.Component {
    render() {
        return (
            <div className="page manager-page">

                <div id="header" className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                        </div>
                        <div className="col-3 text-right">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-9">
                                        Logged in as manager
                                    </div>
                                    <div className="col-3">
                                        <input id="logout-btn" className="btn btn-danger" type="button" value="Log out"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown-divider" />
                    <hr/>
                    <div className="row">
                        <div className="col-3">
                            <h2>Menu & Inventory</h2>
                        </div>
                        <div className="col-6" />
                        <div className="col-3">
                            <h3>Add A Menu Item</h3>
                        </div>
                    </div>
                </div>


                <div id="main-table-container" className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <div id="menu-items" className="table-responsive">
                                <table id="main-table" className="table table-striped">
                                    <tr>
                                        <th>Category</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th />
                                        <th />
                                    </tr>
                                    <tr>
                                        <td>appetizer vegetarian</td>
                                        <td>snap peas</td>
                                        <td>roasted snap peas with sea salt</td>
                                        <td>9.99</td>
                                        <td>500</td>
                                        <td>
                                            <button type="button" className="btn btn-primary">Edit</button>
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                        </div>
                        <div className="col-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <form>
                                            <div className="row">
                                                <div className="form-group col">
                                                    <label htmlFor="add-item-category-input">Category</label>
                                                    <input id="add-item-category-input" type="text" className="form-control" placeholder="Seafood"/>
                                                </div>
                                                <div className="form-group col">
                                                    <label htmlFor="add-item-name-input">Name</label>
                                                    <input id="add-item-name-input" type="text" className="form-control" placeholder="Sushi"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col">
                                                    <label htmlFor="add-item-description-input">Description</label>
                                                    <textarea id="add-item-description-input" className="form-control"
                                                              placeholder="Description"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="add-item-price-input">Price</label>
                                                    <input id="add-item-price-input" type="text" className="form-control" placeholder="9.99"/>
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="add-item-quantity-input">Quantity</label>
                                                    <input id="add-item-quantity-input" type="text" className="form-control" placeholder="100"/>
                                                </div>
                                            </div>
                                            <div className="dropdown-divider" />
                                            <div className="row">
                                                <div className="col">
                                                    <input id="add-item-btn" type="button" className="btn btn-primary btn-block"
                                                           value="Add Item"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <h3>Add A Tag</h3>
                                        <form>
                                            <div className="row">
                                                <div className="form-group col">
                                                    <input id="add-tag-name-input" type="text" className="form-control" placeholder="Seafood"/>
                                                </div>
                                                <div className="form-group col">
                                                    <input id="add-tag-btn" type="button" className="btn btn-primary btn-block"
                                                           value="Add Tag"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}