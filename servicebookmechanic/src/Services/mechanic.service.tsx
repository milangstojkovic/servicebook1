import { Mechanic } from "../Models/Model";
import axios from 'axios';
const baseUrl = 'http://localhost:3000';

let config = {
    headers: "Access-Control-Allow-Origin: *"
}

export const getMechanicService = (): Promise<Mechanic[]> =>
    axios.get<Mechanic[]>(
        `${baseUrl}/mechanic`
    )
        .then(response => response.data)
        .catch(err => {
            throw err
        })

export const getMechanicByMailService = (mail: String): Promise<Mechanic> =>
    axios.get<Mechanic>(
        `${baseUrl}/mechanic/${mail}`
    )
        .then(response => response.data)
        .catch(err => {
            throw err
        })


export const createMechanicService = (mechanic: Mechanic): any =>
    axios.post(
        `${baseUrl}/mechanic/signup`, mechanic
    )
        .catch(err => {
            throw err
        })

export const updateMechanicService = (mechanic: Mechanic): any =>
    axios.put(
        `${baseUrl}/mechanic/${mechanic.mail}`, mechanic
    )

