self.addEventListener("push", function (e) {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/bus2.png",
    });
  });

  self.addEventListener('notificationclick', function (event) {
    event.notification.close();
  
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(function (clientList) {
        for (const client of clientList) {
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      })
    );
  });