import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Vehicle, Record } from "../../Models/Model";
import { getVehiclesByUserService } from "../../Services/vehicle.service";
import {Modal} from "react-bootstrap";
import AddVehicleComponent from "./addVehicleComponent";
import './userComponent.css'
import AddRecordComponent from "./addRecordComponent";
import { getRecordsByVehicleService } from "../../Services/record.service";
interface Props { }
interface IState {
    selectedVehicle:string;
    vehicleModal:boolean;
    recordModal:boolean;
}
class UserComponent extends Component<Props, IState> {
    vehicles!: Vehicle[];
    records!: Record[];
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedVehicle:"",
            vehicleModal:false,
            recordModal:false
        };
        this.vehicles=[];
        this.records=[];
        this.getData();
    }
    render() {
        const vehicleRender = this.vehicles.map((vehicle, index)=>
            <li key={index} id={vehicle._id} onClick={e=>this.setActiveVehicle(e)} className="list-group-item vehicles">{vehicle.manufactor} {vehicle.model} {vehicle.modelyear}</li>
        )
        const recordRender = this.records.map ((record, index)=>
            <li key={index} id={record._id} onClick={e=>this.setActiveRecord(e)} className="list-group-item records">{record.name} {record.startdate.toString().substring(0,10)} </li>
        )
        return (
            <form className="mechanic-form">
                <div className="row">
                    <div className="column">
                        <h1>Vehicles</h1>
                        <button className="btn btn-primary" onClick={e=>this.openVehicleModal(e)}>Add</button>
                        <button className="btn btn-danger" disabled={this.state.selectedVehicle==""}>Delete</button>
                        <ul className="list-group">
                           {vehicleRender}
                        </ul>
                    </div>
                    <div className="column">
                        <h1>Records</h1>
                        <button disabled={this.state.selectedVehicle==""} className="btn btn-primary" onClick={e=>this.openRecordModal(e)}>Add</button>
                        <ul className="list-group">
                           {recordRender}
                        </ul>
                    </div>
                </div>
                <Modal show={this.state.vehicleModal}>
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add vehicle</h5>
                    </div>
                    <div className="modal-body">
                        <AddVehicleComponent/>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" onClick={e=>this.closeVehicleModal(e)}>Close</button>
                    </div>
                    </div>
                </Modal>
                <Modal show={this.state.recordModal}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Record</h5>
                    </div>
                    <div className="modal-body">
                        <AddRecordComponent vehicleid={this.state.selectedVehicle}/>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" onClick={e=>this.closeRecordModal(e)}>Close</button>
                    </div>
                    </div>
                </Modal>
            </form>
        );
    }
    async setActiveVehicle(event:any):Promise<void> {
        let target=event.target;
        await this.setState({selectedVehicle:target.id});
        document.querySelectorAll(".vehicles").forEach(el=>el.className="list-group-item vehicles");
        target.className="list-group-item vehicles active"
        await getRecordsByVehicleService(this.state.selectedVehicle).then(res=>this.records=res);
        console.log(this.records);
        this.forceUpdate();
    }
    setActiveRecord(event:any): void {
        let target=event.target;
        document.querySelectorAll(".records").forEach(el=>el.className="list-group-item records");
        target.className="list-group-item records active"
    }
    async getData():Promise<void> {
        await getVehiclesByUserService(localStorage.getItem("user") as string).then(res=>this.vehicles=res);
        console.log(this.vehicles);
        this.forceUpdate();
    }
    openVehicleModal(event:any):void {
        event.preventDefault();
        this.setState({vehicleModal:true})
    }
    closeVehicleModal(event:any): void {
        event.preventDefault();
        this.setState({vehicleModal:false});
    }
    openRecordModal(event:any): void {
        event.preventDefault();
        this.setState({recordModal:true});
    }
    closeRecordModal(event:any): void {
        event.preventDefault();
        this.setState({recordModal:false});
    }
}
export default UserComponent;
