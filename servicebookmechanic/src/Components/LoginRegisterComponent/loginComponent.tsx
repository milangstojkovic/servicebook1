import React, { Component, useReducer } from "react";
import "./login.css";
import { getUserByNameService } from "../../CassandraServices/user.service";
import { User } from "../../Models/Model";

interface Props {}
interface IState {
  username: string;
  password: string;
}
const emptyString = "";
class Login extends Component<Props, IState> {
  user!: User;
  constructor(props: Props) {
    super(props);
    this.state = {
      username: emptyString,
      password: emptyString,
    };
  }
  handleChangeUsername(event: any): void {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event: any): void {
    this.setState({ password: event.target.value });
  }
  async logInUser(event: any): Promise<void> {
    event.preventDefault();
    await getUserByNameService(this.state.username).then(res=>this.user=res);
    if (this.user) {
      if (this.user.password==this.state.password) {
        localStorage.setItem("username", this.user.username);
        window.location.reload();
      }
    }
    console.log(localStorage.getItem("username"));
  }
  render() {
    return (
      <form className="login-form">
        <label>Username:</label>
        <input
          type="username"
          value={this.state.username}
          onChange={e => this.handleChangeUsername(e)}
          placeholder="Add username"
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
          <button className="btn btn-primary" onClick={e=>this.logInUser(e)}> Login </button>
        </div>
      </form>
    );
  }
}
export default Login;
