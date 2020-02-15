export interface User {
    _id:string;
    name:string;
    surname:string;
    mail: string;
    password: string;
    mechanicid: string;
}
export interface Mechanic{
    _id:string;
    name:string;
    surname:string;
    mail: string;
    password: string;
}
export interface Vehicle {
    _id: string;
    manufactor: string;
    model: string;
    modelyear: number;
    ownerid: string;
}

export interface Record {
    _id: string;
    name:string;
    startdate: Date;
    enddate: Date;
    note: string;
    vehiclekms: number;
    status: RecordStatus;
    vehicleid:string;
    answered: boolean;
    mechanicid: string;
    price:number;
}

export enum RecordStatus {
    NotStarted = 0,
    Started = 1,
    Finished = 2
}
