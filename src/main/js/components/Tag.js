import React from "react";
import ReactDOM from "react-dom";

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

        this.props.onCreateTag(newTag);
        this.props.tagAttributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });
    }


    render() {
        const tagInputs = this.props.tagAttributes.map(attribute =>
            <div key={"add-tag-col"} className="form-group col">
                <input key={"add-tag-input"} type="text" id={"add-tag-" + attribute + "-input"} placeholder={attribute} ref={attribute} className="form-control" />
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
