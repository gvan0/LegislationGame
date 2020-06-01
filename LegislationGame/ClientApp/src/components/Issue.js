import React, { Component } from 'react';

export class Issue extends Component {
    static iconOptions = ["empty", "fas fa-handshake", "fas fa-balance-scale", "fas fa-book", "fas fa-flag-usa", "fas fa-piggy-bank", "fas fa-dove", "fas fa-baby", "fas fa-bell"];
    static displayName = Issue.name;

    constructor(props) {
        super(props);
        this.state = {
            issue = props.issue,
            score = props.dir
        };
    }


}