import * as admin from 'firebase-admin';
import {messaging} from 'firebase-admin';
import BatchResponse = messaging.BatchResponse;
import MulticastMessage = messaging.MulticastMessage;

interface SendNotificationFunctionParams {
    fcm_tokens: string[];
    title: string;
    body: string;
    imageUrl?: string;
    payload?: Record<string, any>;
    overrides?: Partial<MulticastMessage>,
}


const sendNotification = async (data: SendNotificationFunctionParams): Promise<BatchResponse> => {
    const {fcm_tokens, title, body, imageUrl, payload, overrides} = data;

    const iosSound = 'compliment.caf';

    try {
        const res = await admin.messaging().sendMulticast({
            tokens: fcm_tokens,
            data: {
                'ios-sound': iosSound,
                ...payload,
            },
            android: {
                notification: {
                    title: title,
                    body: body,
                    sound: 'compliment',
                    channelId: 'compliment',
                },
            },
            apns: {
                payload: {
                    aps: {
                        // mutableContent: true,
                        sound: iosSound,
                    },
                },
            },
            notification: {
                title: title,
                body: body,
                imageUrl: imageUrl,
            },
            ...overrides,
        });

        console.log('sendNotification:', res);
        return res;
    } catch (e) {
        console.error('sendNotification:', e);
        throw e;
    }
}

export {sendNotification};
