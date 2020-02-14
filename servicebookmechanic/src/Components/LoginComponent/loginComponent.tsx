import React, { Component, useReducer } from "react";
import { getUserByMailService } from "../../Services/user.service";
import { User, Mechanic } from "../../Models/Model";
import { getMechanicByMailService } from "../../Services/mechanic.service";

interface Props {
  isMechanic:boolean;
}
interface IState {
  mail: string;
  password: string;
}
const emptyString = "";
class LoginComponent extends Component<Props, IState> {
  user!: User;
  mechanic!: Mechanic;
  constructor(props: Props) {
    super(props);
    this.state = {
      mail: emptyString,
      password: emptyString,
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
    if(this.props.isMechanic){
      await getMechanicByMailService(this.state.mail).then(res=>this.mechanic=res);
      if(this.mechanic) {
        if(this.mechanic.password==this.state.password) {
          localStorage.setItem("mail", this.mechanic._id);
          localStorage.setItem("mechanic","logged");
          window.location.reload();
        }
      }
    }
    else {
      await getUserByMailService(this.state.mail).then(res=>this.user=res);
      if (this.user) {
        if (this.user.password==this.state.password) {
          localStorage.setItem("user", this.user._id);
          window.location.reload();
        }
      }
      console.log(localStorage.getItem("user"));
    }

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
export default LoginComponent;
