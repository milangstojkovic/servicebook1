import { Record } from "../Models/Model";
import axios from "axios";
const baseUrl = "http://localhost:3000";

export const getRecordsService = (): Promise<Record[]> =>
  axios
    .get<Record[]>(`${baseUrl}/record`)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
    


export const getRecordsByVehicleService = (
  vehicleid: String
): Promise<Record[]> =>
  axios
    .get<Record[]>(`${baseUrl}/record/${vehicleid}`)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });

export const createRecordService = (record: any): any =>
  axios.post(`${baseUrl}/record`, record).catch(err => {
    throw err;
  });

export const updateRecordService = (record: any): any =>
  axios.put(`${baseUrl}/record/${record._id}`, record);

export const deleteRecordService = (recordid: string): any =>
  axios.delete(`${baseUrl}/record/${recordid}`).then(responce=>console.log(responce.data));
