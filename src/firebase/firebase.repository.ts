import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { Messaging } from 'firebase-admin/lib/messaging/messaging';
import { getDatabase  } from "firebase-admin/database";
@Injectable()
export class FirebaseService {
  #messaging: Messaging;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#messaging = firebaseApp.messaging()
  }

  async addOrder(id:number) {
    const db = getDatabase();
    db.ref('orders').push({'order_id': id,})
  }

  async sendingNotificationOneUser(token:string,title:string, message:string) {
    const payload= {
      token: token,
      notification: {
        title: title,
        body: message
      }
    }
    return this.#messaging.send(payload).then((res)=>{
      return {
          success:true
      }

    }).catch((error)=>{
      return {
        success:false
      }
    })
  }
}