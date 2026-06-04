importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey:            "AIzaSyA3c9CVx1eY8_m_16LN4QTmmPXZh_UJdwA",
    authDomain:        "socialhubaptm.firebaseapp.com",
    projectId:         "socialhubaptm",
    storageBucket:     "socialhubaptm.firebasestorage.app",
    messagingSenderId: "27568726411",
    appId:             "1:27568726411:web:1a60222f37b365b1464f8e",
    measurementId:     "G-9HKL98ZJER"
});

const messaging = firebase.messaging();

// Background messages (app closed / tab not focused)
messaging.onBackgroundMessage(function(payload) {
    const title   = payload.notification?.title || 'SocialHub';
    const options = {
        body:  payload.notification?.body  || '',
        icon:  'https://socialhubglobal.com/favicon.ico',
        badge: 'https://socialhubglobal.com/favicon.ico',
        data:  payload.data || {}
    };
    self.registration.showNotification(title, options);
});

// Tap notification → open app
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('https://socialhubglobal.com'));
});
