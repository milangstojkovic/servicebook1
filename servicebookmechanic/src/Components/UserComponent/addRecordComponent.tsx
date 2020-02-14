import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Record} from "../../Models/Model";
import { createRecordService } from "../../Services/record.service";
import {Modal} from 'react-bootstrap';
import './addVehicleComponent.css';
interface Props { 
    vehicleid:string;
}
interface IState {
    name:string,
    startdate:string,
    success:boolean
}
class AddRecordComponent extends Component<Props, IState> {
    constructor(props: Props) {  
        super(props);
        this.state = {
            name:"",
            startdate:"",
            success:false
        };
    }
    render() {
        return (
            <form className="mechanic-form">
                <table>
                    <tbody>
                        <tr><td>Name</td><td><input type="string" onChange={e=>this.changeName(e)} placeholder="Damage"></input></td></tr>
                        <tr><td>Date</td><td><input type="date" onChange={e=>this.changeDate(e)}></input></td></tr>
                        <tr><td></td><td><button disabled={this.state.name=="" || this.state.startdate==""} className="btn btn-success" onClick={e=>this.addRecord(e)}>Add</button></td></tr>
                    </tbody>
                </table>
                <Modal show={this.state.success}>
                <div className="modal-content">
                    <div className="modal-header correct"><h1>RECORD ADDED</h1></div>
                </div>
                </Modal>
            </form>
        );
    }
    changeName(e:any): void {
        this.setState({name:e.target.value});
    }
    changeDate(e:any): void {
        this.setState({startdate:e.target.value});
    }
    async addRecord(e:any): Promise<void> {
        e.preventDefault();
        let record = {
            name:this.state.name,
            startdate:this.state.startdate,
            mechanicid:localStorage.getItem("mechanicid"),
            vehicleid:this.props.vehicleid
        }
        console.log(record);
        await createRecordService(record);    
        this.setState({success:true});
        await this.delay(5000);
        window.location.reload();
    }
    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );  
    }
}
export default AddRecordComponent;
