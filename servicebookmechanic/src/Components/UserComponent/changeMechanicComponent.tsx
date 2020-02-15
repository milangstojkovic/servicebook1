import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Mechanic } from "../../Models/Model";
import { createRecordService, getRecordsService, deleteRecordService } from "../../Services/record.service";
import { Modal } from 'react-bootstrap';
import './addVehicleComponent.css';
import { getMechanicService } from "../../Services/mechanic.service";
import { getUserByMailService, updateUserService } from "../../Services/user.service";
interface Props {
}
interface IState {
    success:boolean;
    mechanicid:string;
}
class ChangeMechanicComponent extends Component<Props, IState> {
    mechanics!: Mechanic[];
    constructor(props: Props) {
        super(props);
        this.state = {
            success:false,
            mechanicid:""
        };
        this.mechanics=[];
        this.getData();
    }
    render() {
        const mechanicsRender = this.mechanics.map((mechanic, index) => (
            <tr className="user" key={index}>
              <td>{index + 1}</td>
              <td> {mechanic.name}</td>
              <td>{mechanic.surname}</td>
              <td>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={mechanic._id}
                    name="cbxMechanic"
                    onClick={ev => this.handleChangeMechanicId(ev)}
                    disabled={localStorage.getItem("mechanicid")==mechanic._id}
                  />
                </div>
              </td>
            </tr>
          ));
        return (
            <form className="mechanic-form">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Choose mechanic</th>
                        </tr>
                    </thead>
                    <tbody>{mechanicsRender}
                    <tr><td></td><td></td><td></td>
                    <td>
                    <button disabled={this.state.mechanicid==""} className="btn btn-success" onClick={e=>this.changeMechanic(e)}>CHANGE</button>
                    </td></tr></tbody>
                </table>
                <Modal show={this.state.success}>
                    <div className="modal-content">
                        <div className="modal-header correct"><h1>MECHANIC CHANGED</h1></div>
                    </div>
                </Modal>
            </form>
        );
    }
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    handleChangeMechanicId(ev: any): void {
        let target = ev.target;
        this.setState({ mechanicid: target.id });
    }
    async getData(): Promise<void> {
        await getMechanicService().then(mechanics => (this.mechanics = mechanics));
        this.forceUpdate();
    }
    async changeMechanic(event:any): Promise<void> {
        event.preventDefault();
        await getUserByMailService(localStorage.getItem("userMail") as string).then( async user=>{
            await getRecordsService().then(async res=>{
                let records=res.filter(record=>record.mechanicid==user.mechanicid && record.status<2);
                records.forEach(r=>deleteRecordService(r._id));
            })
            localStorage.setItem("mechanicid", this.state.mechanicid);
            user.mechanicid=this.state.mechanicid;
            updateUserService(user)});
        this.setState({success:true});
        await this.delay(5000);
        window.location.reload();
    }
}
export default ChangeMechanicComponent;
