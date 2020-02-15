import React, { Component, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { User, Vehicle, Record } from "../../Models/Model";
import { getUsersService } from "../../Services/user.service";
import "./mechanicComponent.css";
import { getVehiclesByUserService } from "../../Services/vehicle.service";
import {
  getRecordsByVehicleService,
  getRecordsService
} from "../../Services/record.service";
import { Modal } from "react-bootstrap";
import RecordsMechanic from "../RecordsMechanic/recordsMechanic";
import AllRecords from "../AllRecordsComponent/allRecords";
import EditRecord from "../EditRecordComponent/editRecordComponent";
interface Props {}
interface IState {
  activeRecord: string;
  activeRecordsNonAnswered: boolean;
  activeAllRecords: boolean;
}
class MechanicComponent extends Component<Props, IState> {
  users!: User[];
  vehicles!: Vehicle[];
  records!: Record[];
  constructor(props: Props) {
    super(props);
    this.state = {
      activeRecord: "",
      activeRecordsNonAnswered: true,
      activeAllRecords: false
    };
    this.users = [];
    this.vehicles = [];
    this.records = [];
    this.getData();
  }
  render() {
    const userRender = this.users.map((user, index) => (
      <li
        key={index}
        id={user._id}
        className="list-group-item users"
        onClick={e => this.setActiveUser(e)}
      >
        {user.name} {user.surname}
      </li>
    ));
    const vehicleRender = this.vehicles.map((vehicle, index) => (
      <li
        key={index}
        id={vehicle._id}
        onClick={e => this.setActiveVehicle(e)}
        className="list-group-item vehicles"
      >
        {vehicle.manufactor} {vehicle.model} {vehicle.modelyear}
      </li>
    ));
    const recordRender = this.records.map((record, index) => (
      <li
        key={index}
        id={record._id}
        onClick={e => this.setActiveRecord(e)}
        className="list-group-item records"
      >
        {record.name}
      </li>
    ));
    return (
      <div>
        <Modal
          className="modal-mechanic"
          show={this.state.activeRecordsNonAnswered}
        >
          <div className="btnClose">
            <button
              onClick={e => this.closeRecordModal(e)}
              className="btn btn-danger"
            >
              X
            </button>
          </div>
          <RecordsMechanic />
        </Modal>
        <form className="mechanic-form">
          <div className="row">
            <div className="column">
              <div className="container">
                <h1>USERS</h1>
                <ul className="list-group">{userRender}</ul>
              </div>
            </div>
            <div className="column">
              <div className="container">
                <h1>VEHICLES</h1>
                <ul className="list-group">{vehicleRender}</ul>
              </div>
            </div>
            <div className="column">
              <div className="container">
                <h1>RECORDS</h1>
                <ul className="list-group">{recordRender}</ul>
              </div>
            </div>
          </div>
          <button
            hidden={this.state.activeRecord == ""}
            className="btn btn-warning"
            onClick={ev=>this.openAllRecords(ev)}
          >
            <h3>UPDATE</h3>
          </button>
        </form>
        <div className="records-table">
            <AllRecords />
        </div>
        <Modal className="modal-mechanic" show={this.state.activeAllRecords}>
          <div className="btnClose">
            <button
              onClick={e => this.closeAllActiveRecords(e)}
              className="btn btn-danger"
            >
              X
            </button>
          </div>
          <EditRecord
          recordId={this.state.activeRecord} />
        </Modal>
      </div>
    );
  }
    openAllRecords(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        ev.preventDefault();
       this.setState({activeAllRecords:true});
    }
    closeAllActiveRecords(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        this.setState({ activeAllRecords: false });
    }
  closeRecordModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    this.setState({ activeRecordsNonAnswered: false });
  }
  async setActiveUser(event: any): Promise<void> {
    let target = event.target;
    document
      .querySelectorAll(".users")
      .forEach(el => (el.className = "list-group-item users"));
    document
      .querySelectorAll(".vehicles")
      .forEach(el => (el.className = "list-group-item vehicles"));
    document
      .querySelectorAll(".records")
      .forEach(el => (el.className = "list-group-item"));
    this.vehicles = [];
    this.records = [];
    target.className = "list-group-item users active";
    await getVehiclesByUserService(target.id).then(v => (this.vehicles = v));
    this.setState({ activeRecord: "" });
    this.forceUpdate();
  }
  async setActiveVehicle(event: any): Promise<void> {
    let target = event.target;
    document
      .querySelectorAll(".vehicles")
      .forEach(el => (el.className = "list-group-item vehicles"));
    document
      .querySelectorAll(".records")
      .forEach(el => (el.className = "list-group-item records"));
    target.className = "list-group-item vehicles active";
    this.records = [];
    await getRecordsService().then(
      res => (this.records = res.filter(r => r.vehicleid == target.id))
    );
    this.setState({ activeRecord: "" });
    this.forceUpdate();
  }
  setActiveRecord(event: any): void {
    let target = event.target;
    document
      .querySelectorAll(".records")
      .forEach(el => (el.className = "list-group-item records"));
    target.className = "list-group-item records active";
    this.setState({ activeRecord: target.id });
  }
  async getData(): Promise<void> {
    await getUsersService().then(users => (this.users = users));
    this.forceUpdate();
  }
}
export default MechanicComponent;
