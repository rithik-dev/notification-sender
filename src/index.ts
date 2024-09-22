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
        imageUrl: 'https://picsum.photos/seed/98765/1300/900',
        android: {
            channelId: 'Notifications',
        },
        ios: {},
        payload: {},
    });
})()
