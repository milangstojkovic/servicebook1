import React, { Component, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homeComponent.css";
import { Modal } from "react-bootstrap";
import { images } from "../../Images/images";
import RegisterMechanic from "../RegisterMechanicComponent/registerMechanicComponent";
import RegisterUser from "../RegisterUserComponent/registerUserComponent";
interface Props {}
interface IState {
  registerMechanicModalIsOpen: boolean;
  registerUserModalIsOpen: boolean;
}
const emptyString = "";
class HomeComponent extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      registerMechanicModalIsOpen: false,
      registerUserModalIsOpen: false
    };
  }
  render() {
    return (
      <div className="cards">
        <div className="card-home">
          <img
            id="imgid"
            className="card-img-top"
            src={images.MECHANIC}
            alt="Card image cap"
          />
          <div className="card-body">
            <h3 className="card-title">You are mechanic</h3>
            <p className="card-text">Select option to continue using app.</p>
            <div className="col">
              <div className="row">
                <a href="#" className="btn btn-primary">
                  Log in
                </a>
              </div>
              <div className="row">
                <a
                  href="#"
                  className="btn btn-warning"
                  onClick={e => this.openRegisterMechanicModal(e)}
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="card-home">
          <img
            id="imgid"
            className="card-img-top"
            src={images.USER}
            alt="Card image cap"
          />
          <div className="card-body">
            <h3 className="card-title">You are user</h3>
            <p className="card-text">Select option to continue using app.</p>
            <div className="col">
              <div className="row">
                <a href="#" className="btn btn-primary">
                  Log in
                </a>
              </div>
              <div className="row">
                <a
                  href="#"
                  className="btn btn-warning"
                  onClick={e => this.openRegisterUserModal(e)}
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.registerMechanicModalIsOpen}>
          <div className="btnClose">
            <button
              onClick={e => this.closeRegisterMechanicModal(e)}
              className="btn btn-danger"
            >
              X
            </button>
          </div>
          <RegisterMechanic />
        </Modal>
        <Modal show={this.state.registerUserModalIsOpen}>
          <div className="btnClose">
            <button
              onClick={e => this.closeRegisterUserModal(e)}
              className="btn btn-danger"
            >
              X
            </button>
          </div>
          <RegisterUser />
        </Modal>
      </div>
    );
  }
  openRegisterUserModal(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void {
    this.setState({
      registerUserModalIsOpen: true
    });
  }
  closeRegisterUserModal(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    this.setState({
      registerUserModalIsOpen: false
    });
  }
  openRegisterMechanicModal(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void {
    this.setState({
      registerMechanicModalIsOpen: true
    });
  }
  closeRegisterMechanicModal(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    this.setState({
      registerMechanicModalIsOpen: false
    });
  }
}
export default HomeComponent;
