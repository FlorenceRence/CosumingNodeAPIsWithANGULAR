import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";

import { UserService } from "../app/services/user.service";

import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdduserComponent } from "./adduser/adduser.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    AdduserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //added for ngModel
    HttpModule,
    ReactiveFormsModule, //added for form group
    AppRoutingModule //added for routes
  ],
  //RouterModule.forRoot() use to define the root route for out application
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
