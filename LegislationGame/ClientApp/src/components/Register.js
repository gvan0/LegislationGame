import React, { Component } from 'react';
import axios from "axios";

export class Register extends Component {
    static displayName = Register.name;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password_dupe: "",
            mailAddr: "",
            errorCode: ""
        };
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePasswordDupe = this.changePasswordDupe.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.registerPlayer = this.registerPlayer.bind(this);
    }

    registerPlayer() {
        axios.post('api/Player', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.mailAddr
        }).then( function (response) {
            alert(response.data);
        }).catch(function (error) {
            this.setState({ errorCode: error.data });
            console.log(error.toJSON());
        });
    }


    changeUsername(event) {
        this.setState({ username: event.target.value });
    }
    changePassword(event) {
        this.setState({ password: event.target.value });
    }
    changePasswordDupe(event) {
        this.setState({ password_dupe: event.target.value });
    }
    changeEmail(event) {
        this.setState({ mailAddr: event.target.value });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <form className="col-12 col-sm-8 col-lg-6" method="POST">
                        <div className="form-group">
                            <label htmlFor="gameCode">User Name:</label>
                            <input type="text" className="form-control" value={this.state.username} id="username" onChange={this.changeUsername} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input type="password" className="form-control" value={this.state.Password} id="password" onChange={this.changePassword} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bill_size">Repeat Password: </label>
                            <input type="password" className="form-control" value={this.state.Password_dupe} id="password_dupe" onChange={this.changePasswordDupe} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hand_size">Email: </label>
                            <input type="text" className="form-control" value={this.state.email} id="mailAddr" onChange={this.changeEmail}  />
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary" onClick={this.registerPlayer}>REGISTER</button>
                        </div>
                        <p>{this.state.ErrorCode}</p>
                    </form>
                </div>
            </div>
        );
    }
}