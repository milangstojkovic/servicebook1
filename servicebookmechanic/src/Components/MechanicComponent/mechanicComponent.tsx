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
            <li key={index} id={user.mail} className="list-group-item" onClick={e=>this.setActiveUser(e)}>{user.name} {user.surname}</li>
        )
        const vehicleRender = this.vehicles.map((vehicle, index)=>
            <a key={index} id={vehicle.id} onClick={e=>this.setActiveVehicle(e)} className="list-group-item">{vehicle.manufacturer} {vehicle.model} {vehicle.modelyear}</a>
        )
        const recordRender = this.records.map ((record, index)=>
            <a key={index} id={record.id} onClick={e=>this.setActiveRecord(e)} className="list-group-item">{record.name}</a>
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
                    <div className="column">
                        <div className="list-group">
                           {vehicleRender}
                        </div>
                    </div>
                    </div>
                    <div className="column">
                    <div className="column">
                        <div className="list-group">
                           {recordRender}
                        </div>
                    </div>
                    </div>
                </div>
            </form>
        );
    }
    setActiveUser(event: any): void {
        let target=event.target;
        target.className="list-group-item active"
    }
    setActiveVehicle(event:any):void {
        let target=event.target;
        target.className="list-group-item active"
    }
    setActiveRecord(event:any): void {
        let target=event.target;
        target.className="list-group-item active"
    }
    async getData():Promise<void> {
        await getUsersService().then(users=>this.users=users);
        console.log(this.users);
        this.forceUpdate();
    }
}
export default MechanicComponent;
