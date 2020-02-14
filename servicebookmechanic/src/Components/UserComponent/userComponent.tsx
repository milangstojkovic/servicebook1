import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Vehicle, Record } from "../../Models/Model";
import { getVehiclesByUserService } from "../../Services/vehicle.service";
import {Modal} from "react-bootstrap";
import AddVehicleComponent from "./addVehicleComponent";
import './userComponent.css'
interface Props { }
interface IState {
    selectedVehicle:string;
    vehicleModal:boolean;
}
class UserComponent extends Component<Props, IState> {
    vehicles!: Vehicle[];
    records!: Record[];
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedVehicle:"",
            vehicleModal:false
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
            <li key={index} id={record._id} onClick={e=>this.setActiveRecord(e)} className="list-group-item records">{record.name}</li>
        )
        return (
            <form className="mechanic-form">
                <div className="row">
                    <div className="column">
                        <button className="btn btn-primary" onClick={e=>this.openVehicleModal(e)}>Add</button>
                        <button className="btn btn-danger" disabled={this.state.selectedVehicle==""}>Delete</button>
                        <ul className="list-group">
                           {vehicleRender}
                        </ul>
                    </div>
                    <div className="column">
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
                        <button className="btn btn-danger">Close</button>
                    </div>
                    </div>
                </Modal>
            </form>
        );
    }
    setActiveVehicle(event:any):void {
        let target=event.target;
        this.setState({selectedVehicle:target.id});
        document.querySelectorAll(".vehicles").forEach(el=>el.className="list-group-item vehicles");
        target.className="list-group-item vehicles active"
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
}
export default UserComponent;
