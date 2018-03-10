export function normalizeNumber(n: string | number): string {
    const num = typeof n === 'string' ? parseInt(n, 10) : n;
    return num < 10 ? `0${n}` : '' + n;
}

export function registerSw() {
    // if ('production' === ENV && 'serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    //}
}

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};