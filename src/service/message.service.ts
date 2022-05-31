import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string = ''

  constructor() { }

  addMessage(message: string) {
    this.message = message

    setTimeout(() => {
      this.clearMessage()
    }, 4000)
  }

  clearMessage() {
    this.message = ''
  }
}
