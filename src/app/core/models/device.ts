export class Device {
    customerId?: string;
    deviceName?: string;
    os?: string;
    osVersion?: string;
    browser: string;
    browserVersion?: string;
    deviceType?: string;
}

export class PushSubscription {
    customerId?: string;
    deviceId?: string;
    notificationGranted?: boolean;
    endpoint?: string;
    auth?: string;
    p256dh?: string;
}