import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Vehicle} from "../../Models/Model";
import { createVehicleService } from "../../Services/vehicle.service";
import {Modal} from 'react-bootstrap';
import './addVehicleComponent.css';
interface Props { }
interface IState {
    manufactor:string,
    model:string,
    modelyear:number,
    success:boolean
}
class AddVehicleComponent extends Component<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            manufactor:"",
            model:"",
            modelyear:0,
            success:false
        };
    }
    render() {
        return (
            <form className="mechanic-form">
                <table>
                    <tbody>
                        <tr><td>Manufactor</td><td><input type="string" onChange={e=>this.changeManufactor(e)}></input></td></tr>
                        <tr><td>Model</td><td><input type="string" onChange={e=>this.changeModel(e)}></input></td></tr>
                        <tr><td>Year</td><td><input onChange={e=>this.changeModelYear(e)} type="number" min="1980" max="2020"></input></td></tr>
                        <tr><td></td><td><button disabled={this.state.manufactor=="" || this.state.model=="" || this.state.modelyear<1980 || this.state.modelyear>2020} className="btn btn-success" onClick={e=>this.addVehicle(e)}>Add</button></td></tr>
                    </tbody>
                </table>
                <Modal show={this.state.success}>
                <div className="modal-content">
                    <div className="modal-header correct"><h1>VEHICLE ADDED</h1></div>
                </div>
                </Modal>
            </form>
        );
    }
    changeManufactor(e:any): void {
        this.setState({manufactor:e.target.value});
    }
    changeModel(e:any): void {
        this.setState({model:e.target.value});
    }
    changeModelYear(e:any): void {
        this.setState({modelyear:e.target.value});
    }
    async addVehicle(e:any): Promise<void> {
        e.preventDefault();
        let vehicle = {
            manufactor:this.state.manufactor,
            model:this.state.model,
            modelyear:this.state.modelyear,
            ownerid:localStorage.getItem("user")
        }
        await createVehicleService(vehicle as Vehicle);
        this.setState({success:true});
        await this.delay(2500);
        window.location.reload();
    }
    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}
export default AddVehicleComponent;
