import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  
  isAuth$ : Observable<boolean>
  @Output() closeSidenav = new EventEmitter();

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  onClose(){
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose()
    this.authService.logout()
  }

}
