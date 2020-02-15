import React, { Component } from "react";
import { getRecordsService, updateRecordService } from "../../Services/record.service";
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
  status:number;
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
      status:-1
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
          <label>Start date: {record.startdate}</label>
        </div>
        <div className="row">Note</div>
        <div className="row">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
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
            onChange={ev => this.changePrice(ev)}
          ></input>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-warning"
            disabled={
              this.state.note == emptyString ||
              this.state.endDate == new Date(emptyString) ||
              this.state.price < 0
            }
            onClick={ev=>this.buttonEditClicked(ev)}
          >
            Edit
          </button>
        </div>
      </div>
    ));
    return <div className="edit-record">{render1}</div>;
  }
   async  buttonEditClicked(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    let record:Record={
        _id:"5e48178cb0a1bf1554943734",
        name:this.record[0].name,
        startdate:this.record[0].startdate,
        enddate:this.state.endDate,
        note:this.state.note,
        vehiclekms:this.record[0].vehiclekms,
        status:this.state.status,
        vehicleid:this.record[0].vehicleid,
        answered:true,
        mechanicid:this.record[0].mechanicid,
        price:this.state.price
    }
    await updateRecordService(record);
}
  changePrice(ev: React.ChangeEvent<HTMLInputElement>): void {
    let target = ev.target;
    this.setState({
      price: parseInt(target.value)
    });
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
    await getRecordsService().then(
      res =>
        (this.record = res.filter(r => r._id == "5e48178cb0a1bf1554943734"))
    );
    this.forceUpdate();
  }
}

export default EditRecord;
