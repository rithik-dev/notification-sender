import 'dotenv/config'

import * as admin from 'firebase-admin';
import {sendNotification} from './send-notification';
import {config} from './configs';

admin.initializeApp({
    credential: admin.credential.cert(config),
});

(async () => {
    await sendNotification({
        fcm_tokens: [],
        title: '[TEST] Title',
        body: '[TEST] Body',
        imageUrl: 'https://images.unsplash.com/photo-1706200234292-66928ea63168?q=80&w=2582&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        android: {
            channelId: 'Notifications',
        },
        ios: {},
        payload: {},
    });
})()
