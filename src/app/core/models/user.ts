import { Lookup } from '../../core/models/lookup';

export class User {
    id?: string;
    cardNumber?: string;
    gender?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    birthdate?: Date;
    mobileNumber?: string;
    firstEntry?: Date;
    lastEntry?: Date;
    currentPoints?: number;
    totalPoints?: number;
    discountAmount?: number;
    pointsToDiscount?: number;
    languages?: Lookup[];
    favoriteProducts?: Lookup[];
    address?: Address; 
    customField1?: string;
    customField2?: string;
    customField3?: string;
    customField4?: string;

    constructor() {
        this.favoriteProducts = [];
        this.languages = [];
        this.address = {};
    }
}

export class Address {
    private static countriesCombineCityZipCode = ['fr'];
    private static countriesShowEmirateList = ['ae'];
    private static countriesShowCityList = ['sa'];
    private static countriesShowAreaList = ['ae','sa'];

    country?: Lookup;
    state?: string;
    city?: string;
    zipCode?: string;
    addressLine1?: string;
    addressLine2?: string;

    public static isDefault(countryCode: string) {
        var combined = this.countriesCombineCityZipCode.concat(this.countriesShowAreaList).concat(this.countriesShowCityList).concat(this.countriesShowEmirateList);
        return combined.indexOf(countryCode) === -1;
    }

    public static showEmirate(countryCode: string) {
        return this.countriesShowEmirateList.indexOf(countryCode.toLocaleLowerCase()) > -1;
    }

    public static showCity(countryCode: string) {
        return this.countriesShowCityList.indexOf(countryCode.toLocaleLowerCase()) > -1;
    }

    public static showArea(countryCode: string) {
        return this.countriesShowAreaList.indexOf(countryCode.toLocaleLowerCase()) > -1;
    }

    public static combineCityZipCode(countryCode: string): boolean {
        return this.countriesCombineCityZipCode.indexOf(countryCode.toLocaleLowerCase()) > -1;
    }
}

export class UserPoint {
    id?: string;
    date: Date;
    correspondingAmount: number;
    currency?: string;
}