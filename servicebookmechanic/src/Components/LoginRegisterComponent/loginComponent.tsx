import React, { Component, useReducer } from "react";
//import "./login.css";
import { getUserByMailService } from "../../Services/user.service";
import { User } from "../../Models/Model";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {}
interface IState {
  mail: string;
  password: string;
}
const emptyString = "";
class Login extends Component<Props, IState> {
  user!: User;
  constructor(props: Props) {
    super(props);
    this.state = {
      mail: emptyString,
      password: emptyString
    };
  }
  handleChangeMail(event: any): void {
    this.setState({ mail: event.target.value });
  }
  handleChangePassword(event: any): void {
    this.setState({ password: event.target.value });
  }
  async logInUser(event: any): Promise<void> {
    event.preventDefault();
    await getUserByMailService(this.state.mail).then(res => (this.user = res));
    if (this.user) {
      if (this.user.password == this.state.password) {
        localStorage.setItem("mail", this.user.mail);
      }
    }
    console.log(localStorage.getItem("mail"));
  }
  render() {
    return (
      <form className="login-form">
        <label>Mail:</label>
        <input
          type="e-mail"
          value={this.state.mail}
          onChange={e => this.handleChangeMail(e)}
          placeholder="Add mail"
        ></input>
        <label>Password:</label>
        <div className="row">
          <input
            type="password"
            value={this.state.password}
            placeholder="Add password"
            onChange={e => this.handleChangePassword(e)}
            className="input-password"
          ></input>
          <div className="buttons-login-register">
            <button
              className="btn btn-primary"
              onClick={e => this.logInUser(e)}
            >
              {" "}
              Login{" "}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default Login;
