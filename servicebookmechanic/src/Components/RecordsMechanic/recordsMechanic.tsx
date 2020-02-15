import React, { Component, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./recordMechanic.css";
import { Record, RecordStatus } from "./../../Models/Model";
import { Modal } from "react-bootstrap";
import { images } from "../../Images/images";
import { getRecordsService, deleteRecordService } from "../../Services/record.service";
interface Props {}
interface IState {}
const emptyString = "";
class RecordsMechanic extends Component<Props, IState> {
  records!: Record[];
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.records = [];
    this.getData();

  }
  render() {
    const recordsRender = this.records.map((record: Record, index) => (
      <tr className="record"  key={index}>
        <td>{index + 1}</td>
        <td>{record.name}</td>
        <td>{record.note}</td>
        <td>{RecordStatus[record.status]}</td>
        <td>{record.startdate.toString().substring(0, 10)}</td>
        <td>
          <button
            className="btn btn-success"
            id={record._id}
            onClick={event => this.clickedAccept(event)}
          >
            Accept
          </button>
          <button
            className="btn btn-danger"
            id={record._id}
            onClick={event => this.clickedDecline(event)}
          >
            Decline
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        {" "}
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Note</th>
              <th>Status</th>
              <th>Start date</th>
              <th>Choose</th>
            </tr>
          </thead>
          <tbody>{recordsRender}</tbody>
        </table>
      </div>
    );
  }
  async clickedDecline(event: any): Promise<void> {
    let target = event.target;
    await deleteRecordService(target.id);
    this.getData();
    
  }
  clickedAccept(event:  any): void {
    let target = event.target;
  }
  async getData(): Promise<void> {
    await getRecordsService().then(records => (this.records = records));
    this.forceUpdate();
  }
}
export default RecordsMechanic;
