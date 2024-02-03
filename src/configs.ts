import {ServiceAccount} from 'firebase-admin/lib/app/credential';


const config: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: process.env.CLIENT_EMAIL,
}

export {config};