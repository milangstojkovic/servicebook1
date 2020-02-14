import { Record } from "../Models/Model";
import axios from 'axios';
const baseUrl = 'http://localhost:3000';


export const getRecordsByVehicleService = (vehicleid: String): Promise<Record[]> =>
    axios.get<Record[]>(
        `${baseUrl}/record/${vehicleid}`
    )
        .then(response => response.data)
        .catch(err => {
            throw err
        })


export const createRecordService = (record: any): any =>
    axios.post(
        `${baseUrl}/record`, record
    )
        .catch(err => {
            throw err
        })

