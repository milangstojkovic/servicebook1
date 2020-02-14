import React, { Component, useReducer } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { User, Vehicle, Record } from "../../Models/Model";
import { getUsersService } from "../../Services/user.service";
import "./mechanicComponent.css"
interface Props { }
interface IState {

}
class MechanicComponent extends Component<Props, IState> {
    users!: User[];
    vehicles!: Vehicle[];
    records!: Record[];
    constructor(props: Props) {
        super(props);
        this.state = {
        };
        this.users=[];
        this.vehicles=[];
        this.records=[];
        this.getData();
    }
    render() {
        const userRender = this.users.map((user,index)=>
            <li key={index} id={user.mail} className="list-group-item users" onClick={e=>this.setActiveUser(e)}>{user.name} {user.surname}</li>
        )
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
                        <ul className="list-group">
                           {userRender}
                        </ul>
                    </div>
                    <div className="column">
                        <ul className="list-group">
                           {vehicleRender}
                        </ul>
                    </div>
                    <div className="column">
                        <div className="list-group">
                           {recordRender}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    setActiveUser(event: any): void {
        let target=event.target;
        document.querySelectorAll(".users").forEach(el=>el.className="list-group-item users");
        target.className="list-group-item users active"
    }
    setActiveVehicle(event:any):void {
        let target=event.target;
        document.querySelectorAll(".vehicles").forEach(el=>el.className="list-group-item vehicles");
        target.className="list-group-item vehicles active"
    }
    setActiveRecord(event:any): void {
        let target=event.target;
        document.querySelectorAll(".records").forEach(el=>el.className="list-group-item records");
        target.className="list-group-item records active"
    }
    async getData():Promise<void> {
        await getUsersService().then(users=>this.users=users);
        console.log(this.users);
        this.forceUpdate();
    }
}
export default MechanicComponent;
