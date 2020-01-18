import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavecloseToggle = new EventEmitter<void>();
  isAuth:boolean = false;
  authSubscription:Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    })
  }

  onClose(){
    this.authService.logOut();    
  }

}
