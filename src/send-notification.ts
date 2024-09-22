import * as admin from 'firebase-admin';
import {messaging} from 'firebase-admin';
import BatchResponse = messaging.BatchResponse;
import MulticastMessage = messaging.MulticastMessage;

interface SendNotificationFunctionParams {
    fcm_tokens: string[];
    title: string;
    body: string;
    android?: {
        channelId?: string;
        sound?: string;
    };
    ios?: {
        sound?: string;
    }
    imageUrl?: string;
    payload?: Record<string, string>;
    overrides?: Partial<MulticastMessage>,
}


const sendNotification = async (data: SendNotificationFunctionParams): Promise<BatchResponse> => {
    const {fcm_tokens, title, body, imageUrl, payload, overrides} = data;

    try {
        const res = await admin.messaging().sendEachForMulticast({
            tokens: fcm_tokens,
            data: payload,
            android: {
                notification: {
                    title,
                    body,
                    imageUrl,
                    channelId: data.android?.channelId,
                    sound: data.android?.sound,
                },
            },
            apns: {
                payload: {
                    aps: {
                        // mutableContent: true,
                        sound: data.ios?.sound,
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
