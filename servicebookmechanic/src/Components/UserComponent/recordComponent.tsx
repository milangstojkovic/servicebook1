import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Record, RecordStatus} from "../../Models/Model";
import { createRecordService, getRecordsByVehicleService } from "../../Services/record.service";
import {Modal} from 'react-bootstrap';
import './addVehicleComponent.css';
interface Props { 
    recordid:string;
}
interface IState {
}
class RecordComponent extends Component<Props, IState> {
    records!:Record[]
    constructor(props: Props) {  
        super(props);
        this.state = {
        };
        this.records=[]
        this.getData();
    }
    render() {
        const recordRender = this.records.map((record,index)=>    
        <tbody key={index} >
            <tr><td>Name:</td><td>{record.name}</td></tr>
            <tr><td>Start date:</td><td>{record.startdate.toString().substring(0,10)}</td></tr> 
            <tr><td>End date:</td><td>{record.enddate.toString().substring(0,10)}</td></tr>
            <tr><td>Note:</td><td><p>{record.note}</p></td></tr>
            <tr><td>Kilometers:</td><td>{record.vehiclekms}</td></tr>
            <tr><td>Price:</td><td>{record.price}</td></tr>
            <tr><td>Status:</td><td>{RecordStatus[record.status]}</td></tr>
        </tbody>
        );
        return (
            <form className="mechanic-form">
                <table>
                    {recordRender}
                </table>
            </form>
        );
    }
    async getData():Promise<void> {
        await getRecordsByVehicleService(this.props.recordid).then(res=>this.records[0]=res);
        this.forceUpdate();
        console.log(this.records);
    }
}
export default RecordComponent;
