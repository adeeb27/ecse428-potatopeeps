'use strict';

/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import ReactDOM from "react-dom";

/**
 * Holds the code related to creating tags from the Manager 'view'.
 * @author Evan Bruchet
 */
export class ManagerCreateTagDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newTag = {};
        this.props.tagAttributes.forEach(attribute => {
            newTag[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });

        this.props.onCreate(newTag, 'tags');
        this.props.tagAttributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });
    }

    /**
     * render - Render a React element into the DOM in the supplied container and return a reference to the component
     *
     * @returns The HTML/JSX code to be displayed by this element. In this case, we return a simple AddTag form used to
     * create a new tag and enter it into the system - only takes the Tag name as input.
     */
    render() {
        const tagInputs = this.props.tagAttributes.map(attribute =>
            <div key={"add-tag-col-" + attribute} className="form-group col">
                <input key={"add-tag-input-" + attribute} type="text" id={"add-tag-" + attribute + "-input"}
                       placeholder={attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                       ref={attribute} className="form-control" />
            </div>
        );

        return(
            <div className="col-12">
                <h3>Add A Tag</h3>
                <form>
                    <div className="row">
                        {tagInputs}
                        <div className="form-group col">
                            <input id="add-tag-btn" type="button" className="btn btn-primary"
                                   value="Add Tag" onClick={this.handleSubmit}/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}