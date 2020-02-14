import React, { Component, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navComponent.css";
import { images } from "../../Images/images";
interface Props {}
interface IState {}
const emptyString = "";
class HomeComponent extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <div className="navbar">                   
                <ul className="nav">
                    <li id="logo" className="nav-item " >
                        <div className="imgdiv">
                        <img className="item" src={images.LOGO}  title="LOG OUT" id="img"></img>
                        </div>
                    </li>
                </ul></div>
    );
  }
}
export default HomeComponent;
