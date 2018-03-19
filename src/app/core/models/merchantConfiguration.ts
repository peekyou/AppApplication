import { Page } from './page'; 

export class MerchantConfiguration {
    timestamp?: number;
    rating1ResourceKey: string;
    rating2ResourceKey: string;
    rating3ResourceKey: string;
    discountAmount: number;
    discountCurrency: string;
    discountPointsThreshold: number;
    discountPointsThresholdArray: number[];
    callText: string;
    phoneNumber: string;
    email: string;
    url: string;
    pages: Page[];
    homePage: Page;
    locationPage: Page;
    contactPage: Page;
    customPages: Page[];
    themeColor1?: string;
    themeColor2?: string;
    facebook?: string;
    twitter?: string;
    linkedIn?: string;
    instagram?: string;
    whatsApp?: string;
}