import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription = new Subscription();

  constructor(private chatService: ChatService,
    private routes:Router) {}

  ngOnInit(): void {
    this.chatService.setupSocketConnection();
    this.chatService.online('1')
  }

  click(){
    console.log('looooooooooooooooooooooooooooooo');
    this.chatService.online('1')
    // this.routes.navigate(['chat'])
  }

  ngOnDestroy(): void {
    console.log('destroy works');
    this.chatService.disconnect();
    this.subscriptions.unsubscribe();
  }

}
