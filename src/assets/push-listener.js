// This file is intentionally without code.
// Push notif
self.addEventListener('notificationclose', function(e) {
    var notification = e.notification;
    console.log('Notification: ', notification);
    var primaryKey = notification.data.primaryKey;
  
    console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var action = e.action;
  console.log('Notification clicked: ', e);

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://www.app-wards.com');
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
  var body;
  if (e.data) {
    body = e.data.text();
  } else {
    body = 'Push message no payload';
  }

  var options = {
    body: body,
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    }
  };
  e.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});