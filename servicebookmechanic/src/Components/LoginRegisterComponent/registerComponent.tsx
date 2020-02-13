import React, { Component } from "react";
import { User } from "../../Models/Model";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createUserService,
  getUsersService
} from "../../Services/user.service";
interface Props {}
interface IState {
  mail: string;
  password: string;
  username: string;
  i: Number;
  isMechanic: boolean;
}
const emptyString = "";
class Register extends Component<Props, IState> {
  usernames!: string[];
  emails!: string[];
  constructor(props: Props) {
    super(props);
    this.state = {
      username: emptyString,
      mail: emptyString,
      password: emptyString,
      i: 0,
      isMechanic: false
    };
  }
  render() {
    return (
      <form className="login-form column ">
        <div className="col ">
          <div className="col">
            <div className="row">
              <label>Username:</label>
            </div>{" "}
            <div className="row">
              <input
                type="string"
                value={this.state.username}
                placeholder="Add username"
                onChange={e => this.handleChangeUsername(e)}
                className="input-email"
              ></input>
            </div>
          </div>
          <div className="col">
            {" "}
            <div className="row">
              <label>Email:</label>
            </div>{" "}
            <div className="row">
              <input
                type="email"
                value={this.state.mail}
                placeholder="Add email"
                onChange={e => this.handleChangeEmail(e)}
                className="input-email"
              ></input>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <label>Password:</label>
            </div>{" "}
            <div className="row">
              <input
                type="password"
                value={this.state.password}
                placeholder="Add password"
                onChange={e => this.handleChangePassword(e)}
                className="input-password"
              ></input>
            </div>
          </div>
          <input
            type="checkbox"
            onChange={e => this.handleChangeMechanic(e)}
          ></input>{" "}
          <label>Check if u re Mechanic</label>
          <div className="buttons-login-register">
            <button
              id="btnReg"
              className="btn btn-primary"
              onClick={e => this.buttonRegisterClicked(e)}
            >
              {" "}
              Register{" "}
            </button>
          </div>
        </div>
      </form>
    );
  }
  handleChangeMechanic(e: any): void {
    if (e.target.checked) this.setState({ isMechanic: true });
    else this.setState({ isMechanic: false });
  }
  handleChangePassword(e: any): void {
    this.setState({ password: e.target.value });
  }
  async handleChangeEmail(e: any): Promise<void> {
    var target = e.target;
    if (this.state.i === 0) {
      await this.getData();
      this.setState({ i: 1 });
    }
    let pomocni: string[] = this.emails.filter(
      element => element === target.value
    );
    this.setState({ mail: target.value });
    if (pomocni.length > 0) {
      target.style.backgroundColor = "red";
      (document.getElementById("btnReg") as HTMLInputElement).disabled = true;
    } else {
      target.style.backgroundColor = "white";
      (document.getElementById("btnReg") as HTMLInputElement).disabled = false;
    }
  }
  async handleChangeUsername(e: any): Promise<void> {
    var target = e.target;
    if (this.state.i === 0) {
      await this.getData();
      this.setState({ i: 1 });
    }
    let pomocni: string[] = this.usernames.filter(
      element => element === target.value
    );
    this.setState({ username: target.value });
    if (pomocni.length === 0) {
      target.style.backgroundColor = "white";
      (document.getElementById("btnReg") as HTMLInputElement).disabled = false;
    } else {
      target.style.backgroundColor = "red";
      (document.getElementById("btnReg") as HTMLInputElement).disabled = true;
    }
  }
  buttonRegisterClicked(e: any): void {
    e.preventDefault();
    let user = {
      mail: this.state.mail,
      password: this.state.password,
      username: this.state.username,
      ismechanic: this.state.isMechanic
    };
    createUserService(user as User);
    console.log(user);
  }
  async getData() {
    await getUsersService().then(
      res => (this.usernames = res.map(element => element.username))
    );
    await getUsersService().then(
      res => (this.emails = res.map(element => element.mail))
    );
    console.log(this.usernames);
  }
}

export default Register;
