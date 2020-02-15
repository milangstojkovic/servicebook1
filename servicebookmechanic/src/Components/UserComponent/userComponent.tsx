import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Vehicle, Record, RecordStatus } from "../../Models/Model";
import { getVehiclesByUserService, deleteSelectedVehicle } from "../../Services/vehicle.service";
import {Modal} from "react-bootstrap";
import AddVehicleComponent from "./addVehicleComponent";
import './userComponent.css'
import AddRecordComponent from "./addRecordComponent";
import { getRecordsByVehicleService, deleteRecordService, getRecordsService } from "../../Services/record.service";
import ChangeMechanicComponent from "./changeMechanicComponent";
import RecordComponent from "./recordComponent";
interface Props { }
interface IState {
    selectedVehicle:string;
    vehicleModal:boolean;
    recordModal:boolean;
    changeMechanicModal:boolean;
    record:boolean;
    selectedRecord:string;
}
class UserComponent extends Component<Props, IState> {
    vehicles!: Vehicle[];
    records!: Record[];
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedVehicle:"",
            selectedRecord:"",
            vehicleModal:false,
            recordModal:false,
            changeMechanicModal:false,
            record:false
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
            <li key={index} id={record._id} onClick={e=>this.setActiveRecord(e)} onDoubleClick={e=>this.openRecord(e)} className="list-group-item records">{record.name} {record.startdate.toString().substring(0,10)} {RecordStatus[record.status]} </li>
        )
        return (
            <form className="mechanic-form">
                <div className="row">
                    <div className="column">
                        <div className="container">
                        <h1>Vehicles</h1>
                        <button className="btn btn-primary" onClick={e=>this.openVehicleModal(e)}>Add</button>
                        <button className="btn btn-danger" disabled={this.state.selectedVehicle==""} onClick={e=>this.deleteSelectedVehicle(e)}>Delete</button>
                        <ul className="list-group">
                           {vehicleRender}
                        </ul>
                        </div>
                    </div>
                    <div className="column">
                        <div className="container">
                        <h1>Records</h1>
                        <button disabled={this.state.selectedVehicle==""} className="btn btn-primary" onClick={e=>this.openRecordModal(e)}>Add</button>
                        <ul className="list-group">
                           {recordRender}
                        </ul>
                    </div>
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
                <Modal show={this.state.changeMechanicModal}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Change mechanic</h5>
                    </div>
                    <div className="modal-body">
                        <ChangeMechanicComponent/>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" onClick={e=>this.closeChangeMechanicModal(e)}>Close</button>
                    </div>
                    </div>
                </Modal>
                <Modal show={this.state.record}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Record</h5>
                    </div>
                    <div className="modal-body">
                        <RecordComponent
                        recordid={this.state.selectedRecord}/>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" onClick={e=>this.closeRecord(e)}>Close</button>
                    </div>
                    </div>
                </Modal>
                <hr></hr>
                <button className="btn btn-warning" onClick={e=>this.openChangeMechanicModal(e)}><h5>CHANGE MECHANIC</h5></button>
            </form>
        );
    }
    async setActiveVehicle(event:any):Promise<void> {
        let target=event.target;
        await this.setState({selectedVehicle:target.id});
        document.querySelectorAll(".vehicles").forEach(el=>el.className="list-group-item vehicles");
        target.className="list-group-item vehicles active"
        await getRecordsService().then(res=>this.records=res.filter(r=>r.vehicleid==this.state.selectedVehicle));
        console.log(this.records);
        this.forceUpdate();
    }
    setActiveRecord(event:any): void {
        let target=event.target;
        document.querySelectorAll(".records").forEach(el=>el.className="list-group-item records");
        target.className="list-group-item records active"
        this.setState({selectedRecord:target.id});
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
    async deleteSelectedVehicle(event:any): Promise<void> {
        await this.records.forEach(record=>deleteRecordService(record._id));
        await deleteSelectedVehicle(this.state.selectedVehicle);
        window.location.reload();
    }
    closeChangeMechanicModal(event:any):void {
        event.preventDefault();
        this.setState({changeMechanicModal:false});
    }
    openChangeMechanicModal(event:any): void {
        event.preventDefault();
        this.setState({changeMechanicModal:true});
    }
    openRecord(event:any): void {
        event.preventDefault();
        this.setState({record:true});
    }
    closeRecord(event:any): void {
        event.preventDefault();
        this.setState({record:false});
    }
}
export default UserComponent;
