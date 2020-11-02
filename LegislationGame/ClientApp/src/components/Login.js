import React, { Component } from 'react';

export default class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userPass: "",
            gameCode: this.props.game_id ?? "",
            gamePass: "",
            loading: false
        }
        this.changeUserName = this.changeUserName.bind(this);
        this.changeUserPass = this.changeUserPass.bind(this);
        this.changeGameCode = this.changeGameCode.bind(this);
        this.changeGamePass = this.changeGamePass.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }


    changeUserName(event) {
        this.setState({ userName: event.target.value });
    }
    changeUserPass(event) {
        this.setState({ userPass: event.target.value });
    }
    changeGameCode(event) {
        this.setState({ gameCode: event.target.value });
    }
    changeGamePass(event) {
        this.setState({ gamePass: event.target.value });
    }

    joinGame(event) {
        event.target.disable();
        this.props.onInitGame(this.state.userName, this.state.gameCode);
        event.target.enable();
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
                            <label htmlFor="userPass">User Password:</label>
                            <input type="password" className="form-control" value={this.state.userPass} id="userPass" onChange={this.changeUserPass} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gameCode">Game Code:</label>
                            <input type="text" className="form-control" value={this.state.gameCode} id="gameCode" onChange={this.changeGameCode} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gamePass">Game Password:</label>
                            <input type="password" className="form-control" value={this.state.gamePass} id="gamePass" onChange={this.changeGamePass} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.joinGame}>JOIN</button>
                        {(this.state.loading === true) && (<p>Loading...</p>)}
                    </form>
                </div>
            </div>
        );
    }
}