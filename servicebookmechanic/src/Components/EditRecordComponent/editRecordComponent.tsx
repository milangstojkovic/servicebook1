import React, { Component } from "react";
import { getRecordsService } from "../../Services/record.service";
import { Record } from "../../Models/Model";
interface Props {
  recordId: string;
}
interface IState {
  startDate: Date;
  endDate: Date;
  note: string;
  price: number;
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
      price: 0
    };
    this.record=[];
    this.getData();
  }
  render() {
      const render1=this.record.map((record,index)=>
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
      
        <label></label>
      </div>);
    return (
      <div className="edit-record">
       {render1}
        </div>
    );
  }
  async getData(): Promise<void> {
    await getRecordsService().then(res=>this.record=res.filter(r=>r._id=="5e47141c0a60681fc46b2bcf"));
    this.forceUpdate();
  }
}

export default EditRecord;
