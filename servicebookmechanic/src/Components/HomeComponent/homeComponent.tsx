import React, { Component, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homeComponent.css";
import { Modal } from "react-bootstrap";
import { images } from "../../Images/images";
import RegisterMechanic from "../RegisterMechanicComponent/registerMechanicComponent";
import RegisterUser from "../RegisterUserComponent/registerUserComponent";
import LoginComponent from "../LoginComponent/loginComponent";
interface Props {}
interface IState {
  registerMechanicModalIsOpen: boolean;
  registerUserModalIsOpen: boolean;
  loginMechanicModal:boolean;
  loginUserModal:boolean;
}
const emptyString = "";
class HomeComponent extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      registerMechanicModalIsOpen: false,
      registerUserModalIsOpen: false,
      loginMechanicModal:false,
      loginUserModal:false
    };
  }
  render() {
    return (
      <div className="container" id="container1">
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
                <a href="#" className="btn btn-primary" onClick={e=>this.openLoginMechanicModal(e)}>
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
                <a href="#" className="btn btn-primary" onClick={e=>this.openLoginUserModal(e)}>
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
        <Modal show={this.state.loginUserModal}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login user</h5>
                    </div>
                    <div className="modal-body">
                        <LoginComponent isMechanic={false}/>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" onClick={e=>this.closeLoginUserModal(e)}>Close</button>
                    </div>
                    </div>
          </Modal>
          <Modal show={this.state.loginMechanicModal}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login mechanic</h5>
                    </div>
                    <div className="modal-body">
                        <LoginComponent isMechanic={true}/>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" onClick={e=>this.closeLoginMechanicModal(e)}>Close</button>
                    </div>
                    </div>
          </Modal>
      </div>
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
  openLoginUserModal(e:any): void {
    e.preventDefault();
    this.setState({loginUserModal:true});
  }
  openLoginMechanicModal(e:any):void {
    e.preventDefault();
    this.setState({loginMechanicModal:true});
  }
  closeLoginUserModal(e:any): void {
    e.preventDefault();
    this.setState({loginUserModal:false});
  }
  closeLoginMechanicModal(e:any):void {
    e.preventDefault();
    this.setState({loginMechanicModal:false});
  }
}
export default HomeComponent;
