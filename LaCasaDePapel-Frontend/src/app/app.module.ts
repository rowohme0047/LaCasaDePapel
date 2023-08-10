import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MaintanenceComponent } from './maintanence/maintanence.component';
import { SharedService } from './shared.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ContactComponent,
    AdminLoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    MaintanenceComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
  ],
  providers: [AuthService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
