import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io,Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket!: Socket;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}
  setupSocketConnection() {
    this.socket = io('http://localhost:5000');
  }
  online(userId:string){
    this.socket.emit('online',userId)
  }

  sendMessage(message: string) {
    console.log('send messages', message);
    this.socket.emit('messages', { message });
  }

  getNewMessage = () => {
    console.log('get messs');

    this.socket.on('message', (message: string) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  disconnect(){
    console.log("disconnected",this.socket);
    
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}
