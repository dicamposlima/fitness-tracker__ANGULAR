import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { environment } from 'src/environments/environment';
import { UIService } from './shared/ui.service';
import { AuthenticationModule } from './auth/authentication.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store'
import { reducers } from './app.reducer'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthenticationModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    AuthService,
    TrainingService,
    UIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }