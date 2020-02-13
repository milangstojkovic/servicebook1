export interface User {
    username: string;
    mail: string;
    password: string;
    ismechanic: boolean;
}

export interface Vehicle {
    id: number;
    manufacturer: string;
    model: string;
    modelYear: number;
    ownerId: number;
}

export interface Record {
    id: number;
    startDate: Date;
    endDate: Date;
    note: string;
    vehicleKms: number;
    status: RecordStatus;
    vehicleId:number;
    answered: boolean;
    mechanicid: number;
    price:number;
}

export enum RecordStatus {
    NotStarted = 0,
    Started = 1,
    Finished = 2
}
