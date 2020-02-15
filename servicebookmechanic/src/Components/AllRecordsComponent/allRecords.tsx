import React, { Component, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./allRecords.css";
import { Record, RecordStatus } from "./../../Models/Model";
import { Modal } from "react-bootstrap";
import { images } from "../../Images/images";
import { getRecordsService, deleteRecordService } from "../../Services/record.service";
import EditRecord from "../EditRecordComponent/editRecordComponent";
interface Props {
    mechanicId:string;
}
interface IState {
  editRecordIsOpen:boolean;
  recordid:string;
}
const emptyString = "";
class AllRecords extends Component<Props, IState> {
  records!: Record[];
  constructor(props: Props) {
    super(props);
    this.state = {
      editRecordIsOpen:false,
      recordid:emptyString
    };
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
            className="btn btn-warning"
            id={record._id}
            onClick={event => this.clickedEdit(event)}
          >
            Edit
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="myrecords">
        {" "}
        <h1 className="h">Records history in Service</h1>
        <table className="table table">
          <thead className="thead-dark">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Note</th>
              <th>Status</th>
              <th>Start date</th>
              <th>Edit record</th>
            </tr>
          </thead>
          <tbody>{recordsRender}</tbody>
        </table>
        <Modal show={this.state.editRecordIsOpen}>
          <div className="btnClose">
            <button
              onClick={e => this.closeEditRecordModal(e)}
              className="btn btn-danger"
            >
              X
            </button>
          </div>
          <EditRecord
          recordId={this.state.recordid} />
        </Modal>
      </div>
    );
  }
  clickedEdit(event: any): void {
    let target=event.target;
    this.setState({
      editRecordIsOpen:true,
      recordid:target.id
    })  }
  closeEditRecordModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    this.setState({
      editRecordIsOpen:false
    })
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
export default AllRecords;
