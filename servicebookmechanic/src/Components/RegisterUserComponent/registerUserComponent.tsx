import React, { Component } from "react";
import { User } from "../../Models/Model";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserService, getUsersService } from '../../Services/user.service';
import './registerUserComponent.css';
interface Props { }
interface IState {
    mail: string;
    password: string;
    i: Number;
    name: string;
    surname: string;
    mechanicid: string;
}
const emptyString = "";
class RegisterUser extends Component<Props, IState> {
    usernames!: string[];
    emails!: string[];
    constructor(props: Props) {
        super(props);
        this.state = {
            name: emptyString,
            surname: emptyString,
            mail: emptyString,
            password: emptyString,
            i: 0,
            mechanicid: "5e45bbd2677f04055c9d006e"
        };
    }
    render() {
        return (
            <form className="login-form">
                <div className="column" id="forma">
                    <div className="row">
                        <label>Name:</label></div>
                    <div className="row">
                        <input
                            type="string"
                            value={this.state.name}
                            placeholder="Add name"
                            onChange={e => this.handleChangeName(e)}
                            className="input-name"
                        ></input></div><div className="row">
                        <label>Surname:</label></div>
                    <div className="row">
                        <input
                            type="string"
                            value={this.state.surname}
                            placeholder="Add surname"
                            onChange={e => this.handleChangeSurname(e)}
                            className="input-name"
                        ></input></div><div className="row">
                        <label>Email:</label></div><div className="row">
                        <input
                            type="email"
                            value={this.state.mail}
                            placeholder="Add email"
                            onChange={e => this.handleChangeEmail(e)}
                            className="input-email"
                        ></input></div>
                    <div className="row">
                        <label>Password:</label></div>
                    <div className="row">
                        <input
                            type="password"
                            value={this.state.password}
                            placeholder="Add password"
                            onChange={e => this.handleChangePassword(e)}
                            className="input-password"
                        ></input></div>
                    <div className="row" id="roww">
                        <button className="btn btn-outline-primary" id="moeDugme" onClick={e => this.buttonRegisterClicked(e)}>REGISTER</button>
                    </div>
                </div>
            </form>
        );

    }

    handleChangePassword(e: any): void {
        this.setState({ password: e.target.value });
    }
    handleChangeName(e: any): void {
        this.setState({ name: e.target.value });
    }
    handleChangeSurname(e: any): void {
        this.setState({ surname: e.target.value });
    }
    async handleChangeEmail(e: any): Promise<void> {
        var target = e.target;
        if (this.state.i === 0) {
            await this.getData();
            this.setState({ i: 1 });
        }
        let pomocni: string[] = this.emails.filter(element => element === target.value);
        this.setState({ mail: target.value });
        if (pomocni.length > 0) {
            target.style.backgroundColor = 'red';
        }
        else {
            target.style.backgroundColor = 'white';
        }
    }
    buttonRegisterClicked(e: any): void {
        e.preventDefault();
        let user = {
            mail: this.state.mail,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname,
            mechanicid: this.state.mechanicid,
        };
        createUserService(user as User);
        console.log(user);
    }
    async getData() {
        await getUsersService().then(res => this.emails = res.map(element => element.mail));
    }
}

export default RegisterUser;
