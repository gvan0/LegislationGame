import React, { Component } from 'react';

export default class MessageBox extends Component {
    static displayName = MessageBox.name;

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <textarea readOnly value="AAAAAA"></textarea>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter" />
                    <div className="input-group-append">
                        <button className="btn btn-dark" type="submit">Go</button>
                    </div>
                </div>
            </div>
        )
    }
}
