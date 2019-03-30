import { Page } from './page';
import { Picture } from './picture';
import { Address } from './user';
import { LoyaltyProgram } from './loyaltyPrograms';

export class MerchantsConfiguration {
    timestamp?: number;
    appWardsApplicationUrl: string;
    design?: MerchantDesign;
    allowCustomerRegistration?: boolean;
    showCustomerAddressLine?: boolean;
    merchants?: Merchant[];
}

export class Merchant {
    id?: string;
    displayName?: string;
    currency?: string;
    rating1ResourceKey?: string;
    rating2ResourceKey?: string;
    rating3ResourceKey?: string;
    anonymousReviews?: string;
    discountAmount?: number;
    discountCurrency?: string;
    discountPointsThreshold?: number;
    callText?: string;
    email?: string;
    pages?: Page[];
    homePage?: Page;
    locationPage?: Page;
    contactPage?: Page;
    customPages?: Page[];
    facebook?: string;
    twitter?: string;
    linkedIn?: string;
    instagram?: string;
    whatsApp?: string;
    snapchat?: string;
    snapchatLink?: string;
    address?: Address;
    loyaltyPrograms?: LoyaltyProgram[];
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
    backgroundImageSize?: string;
}