// Push notif
self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
});

self.addEventListener('notificationclick', function(e) {
var notification = e.notification;
var action = e.action;

if (action === 'close') {
    notification.close();
} else if (notification.data && notification.data.applicationUrl) {
    clients.openWindow(notification.data.applicationUrl + '/promotion');
    notification.close();
}

// Close all other notifications
self.registration.getNotifications().then(function(notifications) {
    notifications.forEach(function(notification) {
        notification.close();
    });
  });
});

self.addEventListener('push', function(e) {
try {
    notificationData = e.data.json();
    var icon = '';
    if (notificationData.data && notificationData.data) { 
        icon = notificationData.data.applicationUrl + '/icon/android-icon-192x192.png';
    }
    var options = {
        body: notificationData.body,
        //image: 'https://customer.app-wards.com/test/icon/android-icon-192x192.png',
        badge: icon,
        icon: icon,
        data: notificationData.data
    };
    e.waitUntil(
        self.registration.showNotification(notificationData.title, options)
    );
  } catch (ex) { 
      console.log(ex);
  }
});