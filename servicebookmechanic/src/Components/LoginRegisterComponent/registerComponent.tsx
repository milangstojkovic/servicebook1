import React, { Component } from "react";
import { User } from "../../Models/Model";
import {createUserService, getUsersService} from '../../CassandraServices/user.service';
interface Props {}
interface IState {
  email: string;
  password: string;
  username: string;
  i:Number;
}
const emptyString = "";
class Register extends Component<Props, IState> {
  usernames!: string[];
  emails!: string[];
  constructor(props: Props) {
    super(props);
    this.state = {
      username: emptyString,
      email: emptyString,
      password: emptyString,
      i:0
    };
  }
  render() {
    return (
      <form className="login-form">
        <label>Username:</label>
        <input
          type="string"
          value={this.state.username}
          placeholder="Add username"
          onChange={e => this.handleChangeUsername(e)}
          className="input-email"
        ></input>
        <label>Email:</label>
        <input
          type="email"
          value={this.state.email}
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
      </form>
    );
    
  }
  handleChangePassword(e: any): void {
    this.setState({ password: e.target.value });
  }
  async handleChangeEmail(e: any): Promise<void> {
    var target=e.target;
    if (this.state.i===0) {
      await this.getData();
      this.setState({i:1});
    }
    let pomocni:string[]=this.emails.filter(element=>element===target.value);
    this.setState({ email: target.value });
    if(pomocni.length>0) {
      target.style.backgroundColor='red';
      (document.getElementById("btnReg") as HTMLInputElement).disabled=true;
    }
    else {
      target.style.backgroundColor='white';
      (document.getElementById("btnReg") as HTMLInputElement).disabled=false;
    }
  }
  async handleChangeUsername(e: any): Promise<void> {
    var target=e.target;
    if (this.state.i===0) {
      await this.getData();
      this.setState({i:1});
    }
    let pomocni:string[]=this.usernames.filter(element=>element===target.value);
    this.setState({ username: target.value });
    if(pomocni.length===0) {
      target.style.backgroundColor='white';
      (document.getElementById("btnReg") as HTMLInputElement).disabled=false;
    }
    else {
      target.style.backgroundColor='red';
      (document.getElementById("btnReg") as HTMLInputElement).disabled=true;
    }
  }
  buttonRegisterClicked(e: any): void {
      e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };
      createUserService(user as User);
      window.location.reload();
  }
  async getData() {
    await getUsersService().then(res=>this.usernames=res.map(element=>element.username));
    await getUsersService().then(res=>this.emails=res.map(element=>element.email));
    console.log(this.usernames)
  }
}

export default Register;
