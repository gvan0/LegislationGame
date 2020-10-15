import React from 'react';
import Issue from './Issue.js';
import './Issue_Bill.css';

export default class IssueBill extends Issue {
    static displayName = IssueBill.name;

    constructor(props) {
        super(props);
        this.handleScoreChange = this.handleScoreChange.bind(this);
        this.bumpScoreChange = this.bumpScoreChange.bind(this);
    }

    bumpScoreChange(event) {
        var ans = parseInt(event.target.value);
        if (isNaN(ans))
            return;

        ans += this.state.score;
        this.setState({ score: ans });
        this.props.onEdit(this.state.issue, ans);
    }

    handleScoreChange(event) {
        var ans = parseInt(event.target.value);
        if (isNaN(ans))
            return;

        this.setState({ score: ans });
        this.props.onEdit(this.state.issue, ans);
    }

    

    render() {
        return (
            <li>
                <div className="input-group input-group-lg mb-2">
                    <div className="input-group-prepend"><span className="input-group-text"><span className={this.iconOptions(this.state.issue)}></span></span></div>
                    <button className="btn btn-dark" value="-1" onClick={this.bumpScoreChange}> – </button>
                    <input className={"form-control " + (this.state.score > 0 ? "plus" : this.state.score < 0 ? "minus" : "")} type="text" value={this.state.score} onChange={this.handleScoreChange} />
                    <button className="btn btn-dark" value="1" onClick={this.bumpScoreChange}> + </button>
                </div>
            </li>
        );
    }


}