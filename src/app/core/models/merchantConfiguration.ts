import { Page } from './page';
import { Picture } from './picture'; 

export class MerchantConfiguration {
    timestamp?: number;
    currency?: string;
    rating1ResourceKey?: string;
    rating2ResourceKey?: string;
    rating3ResourceKey?: string;
    discountAmount: number;
    discountCurrency: string;
    discountPointsThreshold: number;
    discountPointsThresholdArray: number[];
    callText: string;
    email: string;
    appWardsApplicationUrl: string;
    appWardsBackOfficeUrl: string;
    pages: Page[];
    homePage: Page;
    locationPage: Page;
    contactPage: Page;
    customPages: Page[];
    facebook?: string;
    twitter?: string;
    linkedIn?: string;
    instagram?: string;
    whatsApp?: string;
    design?: MerchantDesign;
}

export class MerchantDesign {
    rewardsWheelColor?: string;
    rewardsWheelSecondaryColor?: string
    titlesColor?: string;
    buttonsColor?: string;
    menuBackgroundColor?: string;
    fontFamily?: string;
    logo?: Picture;
    backgroundImage?: Picture;
    headerImage?: Picture;
}