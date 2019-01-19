const publicVapidServerKey = 'BNr3XIIxA_BNs09WxFXt3GTpUi4vYQMdmlfQrnQGcwrkgZs9NTHVfnqUWSUr5X_dCisskJS-fnEuAx9ySjbsyS4';

export function subscribeUser() : Promise<PushSubscription> {
    return navigator.serviceWorker.ready.then(function(reg) {
        return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(publicVapidServerKey)
        });
    });
}

export function getSubscription() : Promise<PushSubscription> {
    return navigator.serviceWorker.ready.then(function(reg) {
        return reg.pushManager.getSubscription();
    });
}

export function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}