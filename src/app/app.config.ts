import { ApplicationRef, enableProdMode, InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export function appConfigFactory(): AppConfig {
    return <AppConfig>window['AppConfig'];
}

export interface AppConfig {
    PermissionsClaim: string;
    ProfileClaim: string;
    UserIdClaim: string;

    ApiEndpoint: string;
    MerchantId: string;    
    Lang: string;    
    MerchantName: string;
}