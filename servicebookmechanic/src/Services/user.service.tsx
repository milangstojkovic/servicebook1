import { User } from "../Models/Model";
import axios from 'axios';
const baseUrl = 'http://localhost:3000';

let config = {
    headers: "Access-Control-Allow-Origin: *"
}

export const getUsersService = (): Promise<User[]> =>
    axios.get<User[]>(
        `${baseUrl}/users`
    )
        .then(response => response.data)
        .catch(err => {
            throw err
        })

export const getUserByMailService = (mail: String): Promise<User> =>
    axios.get<User>(
        `${baseUrl}/users/${mail}`
    )
        .then(response => response.data)
        .catch(err => {
            throw err
        })


export const createUserService = (user: User): any =>
    axios.post(
        `${baseUrl}/users/signup`, user
    )
        .catch(err => {
            throw err
        })

export const updateUserService = (user: any): any =>
    axios.put(
        `${baseUrl}/users/${user.mail}`, user
    )

