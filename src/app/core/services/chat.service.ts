import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: signalR.HubConnection;
  public messages = signal<string[]>([]);

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5062/chatHub')
      .build();

    this.hubConnection.start().catch(err => console.error(err));

    this.hubConnection.on('ReceiveMessage', (message: string) => {
      this.messages.update((currentMessages) => currentMessages.push(message));
    });
  }

  public sendMessage(message: string, userId?: string, groupName?: string) {
    if (userId) {
      this.hubConnection.invoke('SendPrivateMessage', userId, message)
        .catch(err => console.error(err));
    } else if (groupName) {
      this.hubConnection.invoke('SendGroupMessage', groupName, message)
        .catch(err => console.error(err));
    } else {
      this.hubConnection.invoke('SendBroadcastMessage', message)
        .catch(err => console.error(err));
    }
  }
}
