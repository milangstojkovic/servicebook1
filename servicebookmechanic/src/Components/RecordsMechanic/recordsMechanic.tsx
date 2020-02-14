import React, { Component, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homeComponent.css";
import { Modal } from "react-bootstrap";
import { images } from "../../Images/images";
import RegisterMechanic from "../RegisterMechanicComponent/registerMechanicComponent";
import RegisterUser from "../RegisterUserComponent/registerUserComponent";
interface Props {}
interface IState {

}
const emptyString = "";
class HomeComponent extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
     <div></div>
    );
  }
 
}
export default HomeComponent;
