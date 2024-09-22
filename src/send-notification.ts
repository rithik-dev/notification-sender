import * as admin from 'firebase-admin';
import {messaging} from 'firebase-admin';
import BatchResponse = messaging.BatchResponse;
import MulticastMessage = messaging.MulticastMessage;

interface SendNotificationFunctionParams {
    fcm_tokens: string[];
    title: string;
    body: string;
    sound?: string;
    android?: {
        channelId?: string;
    };
    ios?: {}
    imageUrl?: string;
    payload?: Record<string, string>;
    overrides?: Partial<MulticastMessage>,
}


const sendNotification = async (data: SendNotificationFunctionParams): Promise<BatchResponse> => {
    const {
        fcm_tokens,
        title,
        body,
        imageUrl,
        sound,
        payload,
        overrides,
        android,
    } = data;

    try {
        const res = await admin.messaging().sendEachForMulticast({
            tokens: fcm_tokens,
            data: payload,
            android: {
                notification: {
                    title,
                    body,
                    imageUrl,
                    sound,
                    channelId: android?.channelId,
                },
            },
            apns: {
                payload: {
                    aps: {
                        sound,
                        mutableContent: true,
                    },
                },
                fcmOptions: {
                    imageUrl,
                }
            },
            webpush: {
                notification: {
                    title,
                    body,
                    image: imageUrl,
                },
            },
            notification: {
                title,
                body,
                imageUrl,
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
