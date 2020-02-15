import React, { Component } from "react";
import { User } from "../../Models/Model";
import {
  createUserService,
  getUsersService
} from "../../Services/user.service";
interface Props {}
interface IState {
  mail: string;
  password: string;
  i: Number;
  isMechanic: boolean;
  name: string;
  surname: string;
  mechanicid: string;
  mechanicChosen: boolean;
}
const emptyString = "";
class Register extends Component<Props, IState> {
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
      isMechanic: false,
      mechanicid: emptyString,
      mechanicChosen: false
    };
  }
  render() {
    return (
      <form className="login-form">
        <label>Name:</label>
        <input
          type="string"
          value={this.state.name}
          placeholder="Add name"
          onChange={e => this.handleChangeName(e)}
          className="input-name"
        ></input>
        <label>Surname:</label>
        <input
          type="string"
          value={this.state.surname}
          placeholder="Add surname"
          onChange={e => this.handleChangeSurname(e)}
          className="input-name"
        ></input>
        <label>Email:</label>
        <input
          type="email"
          value={this.state.mail}
          placeholder="Add email"
          onChange={e => this.handleChangeEmail(e)}
          className="input-email"
        ></input>
        <label>Password:</label>
        <input
          type="password"
          value={this.state.password}
          placeholder="Add password"
          onChange={e => this.handleChangePassword(e)}
          className="input-password"
        ></input>
        <input
          type="checkbox"
          onChange={e => this.handleChangeMechanic(e)}
        ></input>{" "}
        <label>Check if u re Mechanic</label>
        <div className="buttons-login-register">
          <button
            disabled={this.state.mechanicChosen}
            id="btnReg"
            className="btn btn-primary"
            onClick={e => this.buttonRegisterClicked(e)}
          >
            Register{" "}
          </button>
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
  buttonRegisterClicked(e: any): void {
    let userFromStorage = localStorage.getItem("user");
    e.preventDefault();
    let user = {
      _id: userFromStorage,
      mail: this.state.mail,
      password: this.state.password,
      name: this.state.name,
      surname: this.state.surname,
      mechanicid: this.state.mechanicid,
      ismechanic: this.state.isMechanic
    };
    createUserService(user as User);
    console.log(user);
  }
  async getData() {
    await getUsersService().then(
      res => (this.usernames = res.map(element => element.mail))
    );
    console.log(this.usernames);
  }
}

export default Register;
