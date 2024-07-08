import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { Messaging } from 'firebase-admin/lib/messaging/messaging';

@Injectable()
export class FirebaseService {
  #db: FirebaseFirestore.Firestore;
  #messaging: Messaging;
  #collection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#collection = this.#db.collection('orders');
    this.#messaging = firebaseApp.messaging()
  }

  async addOrder(id:number) {
    await this.#collection.add({"order_id": id})
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