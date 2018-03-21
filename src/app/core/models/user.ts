import { Lookup } from '../../core/models/lookup';

export class User {
    id: string;
    cardNumber: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    birthdate?: Date;
    mobileNumber: string;
    firstEntry?: Date;
    lastEntry?: Date;
    comment?: string;
    receiveSms?: boolean;
    currentPoints?: number;
    address?: Address;
}

export class Address {
    country: Lookup;
    state?: string;
    city?: string;
    zipCode?: string;
    addressLine1?: string;
    addressLine2?: string;
}

export class UserPoint {
    id?: string;
    date: Date;
    correspondingAmount: number;
    currency?: string;
}