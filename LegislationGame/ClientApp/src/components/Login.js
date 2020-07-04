import React, { Component } from 'react';

export default class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            passWord: "",
            gameCode: ""
        }
        this.changeGameCode = this.changeGameCode.bind(this);
        this.changePassWord = this.changePassWord.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.createGame = this.createGame.bind(this);
    }


    changeUserName(event) {
        this.setState({ userName: event.target.value });
    }
    changePassWord(event) {
        this.setState({ passWord: event.target.value });
    }
    changeGameCode(event) {
        this.setState({ gameCode: event.target.value });
    }

    createGame() {
        this.props.onInitGame(this.state.userName, this.state.gameCode);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <form className="col-12 col-sm-8 col-lg-6" method="POST">
                        <div className="form-group">
                            <label htmlFor="userName">User Name:</label>
                            <input type="text" className="form-control" value={this.state.userName} id="userName" onChange={this.changeUserName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gameCode">Password:</label>
                            <input type="password" className="form-control" value={this.state.passWord} id="passWord" onChange={this.changePassWord} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gameCode">Game Code:</label>
                            <input type="text" className="form-control" value={this.state.gameCode} id="gameCode" onChange={this.changeGameCode} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.createGame}>START</button>
                    </form>
                </div>
            </div>
        );
    }
}