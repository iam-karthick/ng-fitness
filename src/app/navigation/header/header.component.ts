import { Component, OnInit, Output,EventEmitter,OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth:boolean = false;
  authSubscription:Subscription;
  constructor(private authService:AuthService) { }
  
  ngOnInit() {
   this.authSubscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    })
  }
  onToggleSlide(){
    this.sidenavToggle.emit()
  }
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
  onLogout(){
    this.authService.logOut();
  }
}
