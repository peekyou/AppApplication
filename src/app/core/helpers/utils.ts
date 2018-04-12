import { MerchantConfiguration } from '../models/merchantConfiguration';

export function normalizeNumber(n: string | number): string {
    const num = typeof n === 'string' ? parseInt(n, 10) : n;
    return num < 10 ? `0${n}` : '' + n;
}

export function registerSw() {
    // 'production' === ENV
    if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

export function iOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(<any>window).MSStream;
};

export function styleBackgoundImage(config: MerchantConfiguration): any {
    if (config.design && config.design.backgroundImage){
        var size = config.design.backgroundImageSize ? 'left top / ' + config.design.backgroundImageSize : '';
        return {
            'background': 'linear-gradient(rgba(100, 100, 100, .5), rgba(100, 100, 100, .5)), url(' + config.design.backgroundImage.src + ') ' + size + ''
        }
    }
    return { }
}