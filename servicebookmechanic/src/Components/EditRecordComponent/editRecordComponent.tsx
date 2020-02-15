import React, { Component } from "react";
import {
  getRecordsService,
  updateRecordService,
  getRecordsByVehicleService
} from "../../Services/record.service";
import { Record } from "../../Models/Model";
import "./editRecordComponent.css";
interface Props {
  recordId: string;
}
interface IState {
  startDate: Date;
  endDate: Date;
  note: string;
  price: number;
  status: number;
}
const emptyString = "";
class EditRecord extends Component<Props, IState> {
  record!: Record[];

  constructor(props: Props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      note: emptyString,
      price: -1,
      status: -1
    };
    this.record = [];
    this.getData();
  }
  render() {
    const render1 = this.record.map((record, index) => (
      <div className="column" key={index}>
        <div className="row">
          <h1>Edit Record</h1>
        </div>
        <div className="row">
          <label>Name: {record.name}</label>
        </div>
        <div className="row">
          <label>Start date: {record.startdate.toString().substring(0,10)}</label>
        </div>
        <div className="row">Note</div>
        <div className="row">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            cols={30}
            onChange={ev => this.handleChangeNote(ev)}
          >
            {record.note}
          </textarea>
        </div>
        <div className="row">
          <label className="lab-startdate">End date</label>
        </div>

        <div className="row">
          <input
            type="datetime-local"
            id="birthdaytime"
            name="birthdaytime"
            onChange={ev => this.changeEndDate(ev)}
          />
        </div>
        <div className="row">
          <label className="price">Price</label>
        </div>
        <div className="row">
          <input
            type="number"
            title="insert price"
            value={this.state.price}
            onChange={ev => this.changePrice(ev)}
          ></input>
        </div>
        <div className="col-auto my-1">
          <label className="mr-sm-2">Status</label>
          <select
            className="custom-select mr-sm-2"
            id="inlineFormCustomSelect"
            value={this.state.status}
            onChange={event => this.changedStatus(event)}
          >
            <option selected value={-1}>Choose...</option>
            <option value={0}>Not started</option>
            <option value={1}>Started</option>
            <option value={2}>Finished</option>
          </select>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-warning"
            disabled={
              this.state.note == emptyString ||
              this.state.endDate == new Date(emptyString) ||
              this.state.price < 0 ||
              this.state.status<0
            }
            onClick={ev => this.buttonEditClicked(ev)}
          >
            Edit
          </button>
        </div>
      </div>
    ));
    return <div className="edit-record">{render1}</div>;
  }
  async changedStatus(event: any): Promise<void> {
     await this.setState({
      status: event.target.value
    });
     await console.log(this.state.status);
  }
  async buttonEditClicked(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    let record: Record = {
      _id: this.props.recordId,
      name: this.record[0].name,
      startdate: this.record[0].startdate,
      enddate: this.state.endDate,
      note: this.state.note,
      vehiclekms: this.record[0].vehiclekms,
      status: this.state.status,
      vehicleid: this.record[0].vehicleid,
      answered: true,
      mechanicid: this.record[0].mechanicid,
      price: this.state.price
    };
    await updateRecordService(record);
    this.forceUpdate();
  }
  async changePrice(ev: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    let target = ev.target;
    await this.setState({
      price: parseInt(target.value)
    });
    console.log(this.state.price);
  }
  changeEndDate(ev: React.ChangeEvent<HTMLInputElement>): void {
    let target = ev.target;
    this.setState({ endDate: new Date(target.value) });
    console.log(this.state.endDate);
  }
  handleChangeNote(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
    let target = ev.target;
    this.setState({
      note: target.value

    });
  }
  async getData(): Promise<void> {
    await getRecordsByVehicleService(this.props.recordId).then(
      res =>{ (this.record[0] = res);
      this.setState({note:res.note, price:res.price})}
    );
    this.forceUpdate();
  }
}

export default EditRecord;
