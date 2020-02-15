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
    if(this.props.isMechanic){
      await getMechanicByMailService(this.state.mail).then(res=>this.mechanic=res);
      if(this.mechanic) {
        if(this.mechanic.password==this.state.password) {
          localStorage.setItem("user", this.mechanic._id);
          window.location.reload();
        }
      }
    }
    else {
      await getUserByMailService(this.state.mail).then(res=>this.user=res);
      if (this.user) {
        if (this.user.password==this.state.password) {
          localStorage.setItem("user", this.user._id);
          localStorage.setItem("mechanicid", this.user.mechanicid);
          window.location.reload();
        }
      }
    }

  }
  render() {
    return (
      <form className="login-form">
        <table className="table">
          <tbody>
            <tr>
        <td>Mail:</td>
        <td>
        <input
          type="e-mail"
          value={this.state.mail}
          onChange={e => this.handleChangeMail(e)}
          placeholder="Add mail"
        ></input>
        </td>
        </tr>
        <tr>
        <td>Password:</td>
        <td>
          <input
            type="password"
            value={this.state.password}
            placeholder="Add password"
            onChange={e => this.handleChangePassword(e)}
            className="input-password"
          ></input>
          </td>
          </tr>
          <tr><td></td>
          <td>
            <button
              className="btn btn-primary"
              onClick={e => this.logInUser(e)}
            >
              Login
            </button>
            </td>
            </tr>
        </tbody>
        </table>
      </form>
    );
  }
}
export default LoginComponent;
