import { Vehicle } from "../Models/Model";
import axios from 'axios';
const baseUrl = 'http://localhost:3000';


export const getVehiclesByUserService = (ownerid: String): Promise<Vehicle[]> =>
    axios.get<Vehicle[]>(
        `${baseUrl}/vehicle/${ownerid}`
    )
        .then(response => response.data)
        .catch(err => {
            throw err
        })


export const createVehicleService = (vehicle: Vehicle): any =>
    axios.post(
        `${baseUrl}/vehicle`, vehicle
    )
        .catch(err => {
            throw err
        })

export const deleteSelectedVehicle= (vehicleid: String): any =>
        axios.delete(
            `${baseUrl}/vehicle/${vehicleid}`
        )
