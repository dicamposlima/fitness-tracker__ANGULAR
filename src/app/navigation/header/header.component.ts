import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth$ : Observable<boolean>
  @Output() sidenavToggle = new EventEmitter()

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout()
  }

}
