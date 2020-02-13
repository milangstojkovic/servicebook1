export interface User {
    name:string;
    surname:string;
    mail: string;
    password: string;
    mechanicid: string;
}
export interface Mechanic{
    name:string;
    surname:string;
    mail: string;
    password: string;
}
export interface Vehicle {
    id: string;
    manufacturer: string;
    model: string;
    modelyear: number;
    ownerid: string;
}

export interface Record {
    id: string;
    name:string;
    startdate: Date;
    enddate: Date;
    note: string;
    vehiclekms: number;
    status: RecordStatus;
    vehicleid:string;
    answered: boolean;
}

export enum RecordStatus {
    NotStarted = 0,
    Started = 1,
    Finished = 2
}
