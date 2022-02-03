import React, { Component } from 'react';

export default class PageFooter extends Component {
    static displayName = PageFooter.name;

    render() {
        return (
            <footer>
                Legislation: The Game &copy; {new Date().getFullYear()}
            </footer>
        );
    }
}
