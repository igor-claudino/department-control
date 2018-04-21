import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  public messagesError: string[] = [];
  public messagesSuccess: string[] = [];

  constructor() { }

  add(message: string, messages: string[]) {
    messages.push(message);

  }

  clear(messages: string[]) {
    messages = [];
  }

}
